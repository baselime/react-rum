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
    <BaselimeRum apiKey={publicApiKey}>
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

Load this at the top of your application to avoid resending the web vital data. 

```tsx
import { BaselimeRum } from '@baselime/react-rum';

function Page({ child }) {

return (
    <BaselimeRum apiKey={publicApiKey} enableWebVitals>
        {child}
    </BaselimeRum>)
}
```

---

## Capture Errors

BaselimeRum automatically captures and sends any Unhandled Errors in your application to Baselime.

```tsx
import { BaselimeRum } from '@baselime/react-rum';

function Page({ child }) {

return (
    <BaselimeRum apiKey={publicApiKey} enableWebVitals fallback={<div>Something went wrong</div>}>
        {child}
    </BaselimeRum>)
}
```

### Error Boundaries

To provide a better UX for end users, use React [Error Boundaries](https://legacy.reactjs.org/docs/error-boundaries.html#introducing-error-boundaries).

The BaselimeErrorBoundary catches errors in any of its child components, reports the error to Baselime. It works in conjunction with the `<BaselimeRum />` Component so that all errors are correlated by Page Load, and User Session.


```jsx
import { BaselimeErrorBoundary } from '@baselime/react-rum';

function UserProfile({ child }) {

return (<BaselimeErrorBoundary fallback={<div>Could not display your user profile</div>}>
            <UserProfileImage />
            <UserName />
            <UserBiography />
        </BaselimeErrorBoundary>
    )
}
```


> This is based on the excellent [react-error-boundary](https://www.npmjs.com/package/react-error-boundary) project.


### Capture Exceptions

Error Boundaries do not catch [errors inside event handlers](https://legacy.reactjs.org/docs/error-boundaries.html#how-about-event-handlers). To catch Exceptions 

```jsx
import { useBaselimeRum } from '@baselime/react-rum';

function MyButtonComponent() {
    const { captureException } = useBaselimeRum();

    function handleClick(e) {
        try { 
                 // Do something that could throw  
        } catch (error) {
            // sends errors to Baselime so they can be fixed   
            captureException(error)
       }
    }

    return <button onClick={handleClick}>Click Me</button>
}
```
---

## Custom Events

Capture custom events for analytics and monitoring. Like logs but with all the power of Baselime.

`sendEvent(message: string, payload)`

```jsx
import { useBaselimeRum } from '@baselime/react-rum';

function CheckoutComponent() {
    const { sendEvent } = useBaselimeRum();

    function handleClick() {

        const checkoutSession = await createImaginaryCheckoutSession()
        sendEvent("Checkout Started", {
            ...checkoutSession
        })
    }

    return <button onClick={handleClick}>Checkout</button>
}

```

---
## Setting the active user

To set the User from another component then call

```tsx
import { useBaselimeRum } from '@baselime/react-rum';

function UserCard({ child }) {
    const { setUser } = useBaselimeRum();

    function login(user) {

        setUser(user.id);
    }
    return (
        <Button onClick={login}>Login</Button>
    }
```


## Using your data

Once the data is captured, you can query, search and analyse your data in the [Baselime console](https://console.baselime.io). You can create dashboards and alerts based on the Real User Monitoring metrics.

## Props

| Parameter           | Description                                                                     |
|---------------------|---------------------------------------------------------------------------------|
| `apiKey`            | Your Baselime API key for authentication and authorization.                     |
| `enableWebVitals`   | (Optional) A boolean flag indicating whether to enable tracking of web vitals.  |
| `enableLocal`       | (Optional) A boolean flag indicating whether to enable local tracking.          |
| `dataset`           | (Optional) The dataset to store the data to. Defaults to `web`.                 |
| `service`           | The name of the application being monitored. Defaults to the hostname.          |
| `fallback`          | A fallback UI component in case the application crashes                         |

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
