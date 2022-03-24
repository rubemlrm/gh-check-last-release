import * as github from '@actions/github';
import * as core from '@actions/core';

const owner = core.getInput('owner');
const repo = core.getInput('repo');

async function run(): Promise<void> {
  try {
    const octokit = github.getOctokit('');
    const lastRelease = await octokit.repos.getLatestRelease({
      owner: owner,
      repo: repo
    });
    if (lastRelease) {
      core.setOutput('release', lastRelease.data.tag_name);
      core.setOutput('id', String(lastRelease.data.id));
      core.setOutput('body', lastRelease.data.body);
    } else {
      core.setFailed("Don't have a last release");
    }
  } catch (error) {
    core.error("error: " + error);
    core.setFailed("error: " + error);
  }
}

run();
