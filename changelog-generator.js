#!/usr/bin/env node

/**
 * Changelog Generator
 * 
 * This script fetches commit history from the GitHub repository,
 * formats the commits, and generates a changelog using Mintlify's Update component.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CHANGELOG_PATH = path.join(__dirname, 'docs/changelog.mdx');
const MAX_COMMITS = 50; // Number of commits to include in the changelog
const REPO_PATH = process.cwd(); // Current working directory (should be the root of the repository)

// Mapping of commit types to friendly names for better readability
const COMMIT_TYPES = {
  feat: 'Feature',
  fix: 'Bug Fix',
  docs: 'Documentation',
  style: 'Style',
  refactor: 'Refactor',
  perf: 'Performance',
  test: 'Testing',
  build: 'Build',
  ci: 'CI',
  chore: 'Maintenance',
};

/**
 * Fetches git commits and returns them as an array
 */
function getCommits() {
  try {
    // Format: hash|author|date|subject
    const command = `git -C "${REPO_PATH}" log -n ${MAX_COMMITS} --pretty=format:"%h|%an|%ad|%s" --date=short`;
    const output = execSync(command).toString().trim();
    
    return output.split('\n').map(line => {
      const [hash, author, date, subject] = line.split('|');
      
      // Try to extract conventional commit type (e.g., feat:, fix:, etc.)
      let type = 'Other';
      let message = subject;
      
      const match = subject.match(/^(\w+)(\([^)]+\))?:\s(.+)$/);
      if (match) {
        const commitType = match[1];
        const scope = match[2] ? match[2].replace(/[()]/g, '') : '';
        message = match[3];
        
        type = COMMIT_TYPES[commitType] || commitType;
        if (scope) {
          type = `${type} (${scope})`;
        }
      }
      
      return {
        hash,
        author,
        date,
        type,
        message,
      };
    });
  } catch (error) {
    console.error('Error fetching git commits:', error.message);
    return [];
  }
}

/**
 * Groups commits by date
 */
function groupCommitsByDate(commits) {
  const grouped = {};
  
  commits.forEach(commit => {
    if (!grouped[commit.date]) {
      grouped[commit.date] = [];
    }
    grouped[commit.date].push(commit);
  });
  
  return grouped;
}

/**
 * Generates a version tag based on date
 */
function generateVersionTag(date) {
  const parts = date.split('-');
  return `v${parts[0].substring(2)}.${parts[1]}.${parts[2]}`;
}

/**
 * Generates the changelog content in MDX format
 */
function generateChangelog() {
  const commits = getCommits();
  const groupedCommits = groupCommitsByDate(commits);
  
  let mdxContent = `---
title: 'Changelog'
description: 'Track changes and updates to MCPVerified'
---

# Changelog

This page is automatically generated from GitHub commit history.

`;

  // Sort dates in reverse chronological order
  const sortedDates = Object.keys(groupedCommits).sort((a, b) => new Date(b) - new Date(a));
  
  sortedDates.forEach(date => {
    const commits = groupedCommits[date];
    const version = generateVersionTag(date);
    
    // Get unique commit types for tags
    const types = [...new Set(commits.map(commit => commit.type))];
    
    mdxContent += `
<Update label="${date}" description="${version}" tags={[${types.map(type => `"${type}"`).join(', ')}]}>
## Changes

${commits.map(commit => `- **${commit.type}**: ${commit.message} ([${commit.hash}](https://github.com/code-agents/mcp-hub/commit/${commit.hash}))`).join('\n')}

</Update>
`;
  });
  
  return mdxContent;
}

/**
 * Writes the changelog to a file
 */
function writeChangelog() {
  try {
    const content = generateChangelog();
    
    // Create the directory if it doesn't exist
    const dir = path.dirname(CHANGELOG_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(CHANGELOG_PATH, content);
    console.log(`Changelog generated at: ${CHANGELOG_PATH}`);
  } catch (error) {
    console.error('Error writing changelog:', error.message);
  }
}

// Run the generator
writeChangelog(); 