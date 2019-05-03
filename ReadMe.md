# Time Slicing

A small react study, which uses a try-catch block to mock a React Fiber, that tries to shows asynchronously obtained data, and catches when the data is not preset in a cache.

When the catch happens, a fallback is shown and the data is fetched from the network.

Once the data arrives, the data is placed in the cache, the Fiber re-renders the component and adds it to the DOM.

This project uses [Parcel](https://parceljs.org/) to put together a react app.
