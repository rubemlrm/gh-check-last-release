import * as github from '@actions/github';
import * as core from '@actions/core';

const owner = core.getInput('owner');
const repo = core.getInput('repo');

export async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('github_token', { required: true });

    const octokit = github.getOctokit(githubToken);
    const lastRelease = await octokit.repos.getLatestRelease({
      owner: owner,
      repo: repo,
    });
    if (lastRelease) {
      core.setOutput('tag_name', lastRelease.data.tag_name);
      core.setOutput('release', lastRelease.data.name);
      core.setOutput('id', String(lastRelease.data.id));
      core.setOutput('body', lastRelease.data.body);
      core.setOutput('created_at', lastRelease.data.created_at);
      core.setOutput('published_at', lastRelease.data.published_at);
      core.setOutput('tarball_url', lastRelease.data.tarball_url);
      core.setOutput('zipball_url', lastRelease.data.zipball_url);
    } else {
      core.setFailed("Don't have a last release");
    }
  } catch (error) {
    core.error('error: ' + error);
    core.setFailed('error: ' + error);
  }
}

run();
