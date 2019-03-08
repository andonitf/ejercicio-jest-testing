# 01 Jest testing
![Travis (.org) branch](https://img.shields.io/travis/andonitf/ejercicio-jest-testing/master.svg?style=popout)

## What to do

Do unit tests to:

- ./src/pages/members/list/mappers
- ./src/pages/members/list/actions
- ./src/pages/members/list/reducers
- ./src/pages/members/list/components
- ./src/pages/members/list/pageContainer

## Bonus points

- Use reselect methods and do TDD (Test-Drive Development) to login page.
- Configure code coverage and threshold not to permit code merge if not pass x%.
- Create a repository and configure Travis CI to works with it.

## Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

## Steps to run tests

- Jest test commands:
  - `npm test`: to single run
  - `npm run test:watch`: to run all specs after changes.
  - `npm run test:coverage`: to run code coverage in text mode.
  - `npm run test:coverage:html`: to run code coverage in html mode.

## Code coverage

Code coverage report can be found [here](https://cursos-repo.gitlab.io/lemoncode/testing/jest-testing)
