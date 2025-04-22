#!/usr/bin/env node

/**
 * News Generator
 * 
 * This script fetches commit history from the GitHub repository,
 * formats the commits using AI, and generates a news feed.
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get current directory for path resolution
const currentDir = process.cwd();

// Configuration
const NEWS_PATH = path.join(currentDir, 'docs/news.mdx');
const MAX_COMMITS = 50; // Number of commits to include in the news feed
const REPO_PATH = currentDir; // Use current working directory as repo path

// Set OpenAI API key from environment variable
process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

// Define commit interface
interface Commit {
    hash: string;
    author: string;
    date: string;
    message: string;
}

// Define grouped commits interface
interface GroupedCommits {
    [date: string]: Commit[];
}

/**
 * Fetches git commits and returns them as an array
 */
function getCommits(): Commit[] {
    try {
        // Format: hash|author|date|subject
        const command = `git -C "${REPO_PATH}" log -n ${MAX_COMMITS} --pretty=format:"%h|%an|%ad|%s" --date=short`;
        const output = execSync(command).toString().trim();

        return output.split('\n').map(line => {
            const [hash, author, date, subject] = line.split('|');

            // Extract the message without conventional commit prefixes
            let message = subject;
            const match = subject.match(/^(\w+)(\([^)]+\))?:\s(.+)$/);
            if (match) {
                message = match[3];
            }

            return {
                hash,
                author,
                date,
                message,
            };
        });
    } catch (error) {
        console.error('Error fetching git commits:', error instanceof Error ? error.message : String(error));
        return [];
    }
}

/**
 * Groups commits by date
 */
function groupCommitsByDate(commits: Commit[]): GroupedCommits {
    const grouped: GroupedCommits = {};

    commits.forEach(commit => {
        if (!grouped[commit.date]) {
            grouped[commit.date] = [];
        }
        grouped[commit.date].push(commit);
    });

    return grouped;
}

/**
 * Enhances commit messages using AI to make them more news-like
 */
async function enhanceCommitMessage(message: string): Promise<string> {
    try {
        const { text } = await generateText({
            model: openai('gpt-4o'),
            prompt: `Convert the following developer commit message into a well-formatted, properly, well formatted engaging news item. If the message is not relevant to News, just return NOT-WORTHY. Its like a changelog also. We don't want all messages starting with like "In an exciting update..." etc, so keep all very concise and short (1-2 sentences): "${message}"`,
            maxTokens: 100,
            temperature: 0.7,
        });

        return text.trim() || message;
    } catch (error) {
        console.error('Error enhancing commit message:', error instanceof Error ? error.message : String(error));
        return message;
    }
}

/**
 * Generates the news content in MDX format
 */
async function generateNews(): Promise<string> {
    const commits = getCommits();
    const groupedCommits = groupCommitsByDate(commits);

    let mdxContent = `---
title: 'News'
description: 'Latest updates from MCPVerified'
---

The latest news and updates.

`;

    // Sort dates in reverse chronological order
    const sortedDates = Object.keys(groupedCommits).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    for (const date of sortedDates) {
        const commits = groupedCommits[date];
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        mdxContent += `\n## ${formattedDate}\n\n`;

        for (const commit of commits) {
            const enhancedMessage = await enhanceCommitMessage(commit.message);
            console.log(`- ${enhancedMessage}`);
            if (enhancedMessage && enhancedMessage !== "NOT-WORTHY") {
                mdxContent += `- ${enhancedMessage} [See more](https://github.com/code-agents/mcp-hub/commit/${commit.hash})\n`;
            }
        }

        mdxContent += '\n';
    }

    return mdxContent;
}

/**
 * Writes the news feed to a file
 */
async function writeNews(): Promise<void> {
    try {
        const content = await generateNews();

        // Create the directory if it doesn't exist
        const dir = path.dirname(NEWS_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(NEWS_PATH, content);
        console.log(`News feed generated at: ${NEWS_PATH}`);
    } catch (error) {
        console.error('Error writing news feed:', error instanceof Error ? error.message : String(error));
    }
}

// Check if environment is properly set up
if (!process.env.OPENAI_API_KEY) {
    console.warn('WARNING: OPENAI_API_KEY environment variable not set. AI enhancement will not work properly.');
    console.warn('Create a .env file in the project root with OPENAI_API_KEY=your_api_key');
}

// Run the generator
writeNews().catch(error => {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
}); 