# Check Last Repo action

This action get the information relative to the last release on a given repository
## Inputs

### `owner`

**Required** The user/organization that owns the repository.

### `repo`
**Required** The repository name.


### `github_token`
**Required** Github token.
## Outputs

### `tag_name`

The tag of the last release

### `release`
release name
### `id`
release ID
### `body`
release body
### `created_at`
release created at
### `published_at`
release published at
### `tarball_url`
release tarball url
### `zipball_url`
release zipball url

## Example usage

```yaml
- id: check-release
  uses: Rubemlrm/gh-check-last-release@main
  with:
    github_token: ${{ secrets.github_token }}
    owner: "Rubemlrm"
    repo: "gh-check-last-release"
```
