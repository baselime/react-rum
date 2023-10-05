# Baselime React Real User Monitoring
[![Documentation][docs_badge]][docs]
[![Latest Release][release_badge]][release]
[![License][license_badge]][license]

[Baselime](https://baselime.io) enables observability for the next generation of cloud applications.

This library enables you to monitor real-user behaviour of your React and Next.js applications. 

## Usage

```bash
npm i --save @baselime/react-rum
```

Add the `BaselimeRum` Component at the root of your React application application.

> Get the `publicApiKey` from the Baselime console. Make sure to use a public API key.


```tsx

function Page({ child }) {

return (
    <BaselimeRum apiKey={publicApiKey} service="my-website">
        {child}
    </BaselimeRum>)
}
```

The following data is automatically captured for every page view of your application:
- `timezone`
- `language`
- `os`
- `userAgent`
- `url`
- `device`
- `country`
- `city`

## Web Vitals

Additionally, you can enable capturing [web vitals](https://web.dev/vitals/) from your React applications. Use the `enableWebVitals` prop.

- [Time To First Byte (TTFB)](https://web.dev/ttfb/)
- [Largest Contentful Paint (LCP)](https://web.dev/lcp/)
- [First Input Delay (FID)](https://web.dev/fid/)
- [Cumulative Layout Shift (CLS)](https://web.dev/cls/)

```tsx

function Page({ child }) {

return (
    <BaselimeRum apiKey={publicApiKey} service="my-website" enableWebVitals>
        {child}
    </BaselimeRum>)
}
```

## Using your data

Once the data is captured, you can query, search and analyse your data in the [Baselime console](https://console.baselime.io). You can create dashboards and alerts based on the Real User Monitoring metrics.

## Props

| Parameter           | Description                                                                                                  |
|---------------------|--------------------------------------------------------------------------------------------------------------|
| `apiKey`            | Your Baselime API key for authentication and authorization.                                      |
| `enableWebVitals`   | (Optional) A boolean flag indicating whether to enable tracking of web vitals.               |
| `enableLocal`       | (Optional) A boolean flag indicating whether to enable local tracking.                       |
| `dataset`           | (Optional) The dataset to store the data to. Defaults to `web`.                      |
| `service`           | The name of the service or application being monitored.                  |

## License

&copy; Baselime Limited, 2023

Distributed under MIT License (`The MIT License`).

See [LICENSE](LICENSE) for more information.

<!-- Badges -->

[docs]: https://baselime.io/docs/
[docs_badge]: https://img.shields.io/badge/docs-reference-blue.svg?style=flat-square
[release]: https://github.com/baselime/react-rum/releases/latest
[release_badge]: https://img.shields.io/github/release/baselime/react-rum.svg?style=flat-square&ghcache=unused
[license]: https://opensource.org/licenses/MIT
[license_badge]: https://img.shields.io/github/license/baselime/react-rum.svg?color=blue&style=flat-square&ghcache=unused
