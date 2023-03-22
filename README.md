<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/richardm213/hydration-helper">
    <img
      src="https://user-images.githubusercontent.com/92076990/222994738-4f525ce2-0789-42ce-9440-bd5096b8d1c2.png"
      alt="Logo"
      width="80"
      height="80" />
  </a>

  <h3 align="center">Hydration Helper</h3>
  <p align="center">An app designed to keep you hydrated</p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#how-to-run">How to run</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<div align="center">
  <a href="https://github.com/richardm213/hydration-helper">
    <img
      src="https://user-images.githubusercontent.com/92076990/226101839-93fa988c-080d-46ba-8456-3d798fc6662c.png"
      width="250" />
  </a>
  <a href="https://github.com/richardm213/hydration-helper">
    <img
      src="https://user-images.githubusercontent.com/92076990/226823247-e4082c1b-ebdf-4af5-bfd3-efb5c24ed44d.png"
      width="250" />
  </a>
  <a href="https://github.com/richardm213/hydration-helper">
    <img
      src="https://user-images.githubusercontent.com/92076990/226823325-4bdeaaa2-cd4e-4961-96a1-c473c7f39c8b.png"
      width="250" />
  </a>
  <a href="https://github.com/richardm213/hydration-helper">
    <img
      src="https://user-images.githubusercontent.com/92076990/226822745-04fafbc9-837c-4f15-9da3-7a5c674bb7bc.png"
      width="250" />
  </a>
  <a href="https://github.com/richardm213/hydration-helper">
    <img
      src="https://user-images.githubusercontent.com/92076990/226822803-53de4a2a-0a88-40c9-af92-f326a9d882a5.png"
      width="250" />
  </a>
</div>

<br />

<div>
  Hydration Helper is an app designed to recommend you a daily water intake
  based on a variety of factors personal to you. Once you receive a
  recommendation, the app will help you track your daily water intake as you
  progress through your day. Over time, the app will continue to update its
  model for you based on your daily drinking habits, your water intake progress,
  and more.
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy of our app up and running, follow the steps below.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```
- xcode

### Installation

1. Get an OpenWeather API Key at [https://openweathermap.org/api](https://openweathermap.org/api)
2. Get a FoodData Central Key at [https://fdc.nal.usda.gov/api-guide.html](https://fdc.nal.usda.gov/api-guide.html)
3. Clone the repo

```sh
git clone https://github.com/richardm213/hydration-helper.git
```

3. Install NPM packages

```sh
npm install
```

1. Enter your API keys into `.env`

```sh
WEATHER_API_KEY='ENTER YOUR KEY'
FOOD_DATA_API_KEY='ENTER YOUR KEY'
```

### How to Run

1. Create ios build
   ```sh
   npm run ios
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
