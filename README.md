# React RUM

Real User Monitoring for React

## Getting started

```bash
npm i @baselime/react-rum
```

Add the BaselimeRum Component at the root of your application 

Generate a Baselime Public API Key and add it as a property
```tsx

function Page({ child }) {

return (
    <BaselimeRum apiKey={apiKey} environment="vercel-vercel-fan-club" dataset="web-vitals">
        {child}
    </BaselimeRum>)
}
```
