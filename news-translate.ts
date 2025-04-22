#!/usr/bin/env node

/**
 * News Translator
 * 
 * This script reads the news.mdx file, translates it to Japanese using AI,
 * and generates a translated version in docs/news.ja.mdx.
 */

import * as fs from 'fs';
import * as path from 'path';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get current directory for path resolution
const currentDir = process.cwd();

// Configuration
const SOURCE_NEWS_PATH = path.join(currentDir, 'docs/news.mdx');
const TARGET_NEWS_PATH = path.join(currentDir, 'docs/ja/news.mdx');
const CONCURRENT_REQUESTS = 5;

// Set OpenAI API key from environment variable
process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

/**
 * Reads the news.mdx file
 */
function readNewsFile(): string {
    try {
        return fs.readFileSync(SOURCE_NEWS_PATH, 'utf8');
    } catch (error) {
        console.error('Error reading news file:', error instanceof Error ? error.message : String(error));
        throw error;
    }
}

/**
 * Splits content into chunks for parallel processing
 * Tries to split at paragraph boundaries to maintain context
 */
function splitContentIntoChunks(content: string, numChunks: number): string[] {
    // Split content by paragraphs (empty lines)
    const paragraphs = content.split(/\n\s*\n/);

    // Initialize chunks
    const chunks: string[] = Array(numChunks).fill('');

    // Distribute paragraphs among chunks
    paragraphs.forEach((paragraph, index) => {
        const chunkIndex = index % numChunks;
        chunks[chunkIndex] += (chunks[chunkIndex] ? '\n\n' : '') + paragraph;
    });

    // Filter out empty chunks
    return chunks.filter(chunk => chunk.trim() !== '');
}

/**
 * Translates a single chunk to Japanese using AI
 */
async function translateChunk(chunk: string, index: number): Promise<string> {
    try {
        console.log(`Translating chunk ${index + 1}...`);
        const { text } = await generateText({
            model: openai('gpt-4o'),
            prompt: `Translate the following MDX content to Japanese natively. Keep all syntax, links, and formatting intact. Only translate the actual text content:

${chunk}`,
            temperature: 0.1,
        });

        return text.trim();
    } catch (error) {
        console.error(`Error translating chunk ${index + 1}:`, error instanceof Error ? error.message : String(error));
        throw error;
    }
}

/**
 * Process chunks in batches with limited concurrency
 */
async function processInBatches<T, R>(
    items: T[],
    batchSize: number,
    processor: (item: T, index: number) => Promise<R>
): Promise<R[]> {
    const results: R[] = [];

    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await Promise.all(
            batch.map((item, batchIndex) => processor(item, i + batchIndex))
        );
        results.push(...batchResults);
    }

    return results;
}

/**
 * Main function to translate news.mdx to Japanese
 */
async function translateNews(): Promise<void> {
    try {
        console.log('Reading news.mdx file...');
        const content = readNewsFile();

        // Split content into chunks
        const chunks = splitContentIntoChunks(content, CONCURRENT_REQUESTS);
        console.log(`Split content into ${chunks.length} chunks for parallel translation`);

        // Translate chunks in parallel with limited concurrency
        console.log(`Translating chunks with ${CONCURRENT_REQUESTS} concurrent requests...`);
        const translatedChunks = await processInBatches(
            chunks,
            CONCURRENT_REQUESTS,
            translateChunk
        );

        // Combine translated chunks
        const translatedContent = translatedChunks.join('\n\n');

        // Create the directory if it doesn't exist
        const dir = path.dirname(TARGET_NEWS_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Write the translated content to the target file
        fs.writeFileSync(TARGET_NEWS_PATH, translatedContent);
        console.log(`Japanese translation generated at: ${TARGET_NEWS_PATH}`);
    } catch (error) {
        console.error('Error translating news:', error instanceof Error ? error.message : String(error));
    }
}

// Check if environment is properly set up
if (!process.env.OPENAI_API_KEY) {
    console.warn('WARNING: OPENAI_API_KEY environment variable not set. Translation will not work properly.');
    console.warn('Create a .env file in the project root with OPENAI_API_KEY=your_api_key');
}

// Run the translator
translateNews().catch(error => {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
}); 