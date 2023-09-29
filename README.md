# React RUM

Real User Monitoring for React

## Getting started

```bash
npm i @baselime/react-rum
```

Add the BaselimeRum Component at the root of your application 

Create a dataset in baselime for the data

Generate a Baselime Public API Key and add it as a property
```tsx

function Page({ child }) {

return (
    <BaselimeRum apiKey={apiKey} service="my-app" enableWebVitals enableLocal>
        {child}
    </BaselimeRum>)
}
```
