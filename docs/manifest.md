# Manifest

You can specify your app details on Paquet, using your `manifest.json` or `site.webmanifest` file.

> This file is usually crawled by Paquet.

Here is a `manifest.json` example:

```json
{
	"name": "Paquet",
	"author": "Roseto",
	"short_name": "Paquet",
	"description": "Check out Paquet to find the best web apps on the open web.",
	"id": "app.paquet",
	"icons": [
		{
			"src": "/android-chrome-192x192.png",
			"sizes": "192x192",
			"type": "image/png"
		},
		{
			"src": "/android-chrome-512x512.png",
			"sizes": "512x512",
			"type": "image/png"
		},
		{
			"src": "/android-chrome-192x192.png",
			"sizes": "192x192",
			"type": "image/png",
			"purpose": "maskable"
		},
		{
			"src": "/android-chrome-512x512.png",
			"sizes": "512x512",
			"type": "image/png",
			"purpose": "maskable"
		}
	],
	"theme_color": "#8267be",
	"background_color": "#ffffff",
	"display": "standalone",
	"start_url": "/?utm_source=pwa",
	"scope": "/"
}
```

The values Paquet uses in your app listing are:

-   `name`
-   `short_name`
-   `author`
-   `description`
-   `categories`
-   `icons`
-   `screenshots`
-   `theme_color`

### `name` (required)

This is the name that is going to be used when showing your app.

### `short_name` (optional)

This is the short name that is going to be used when showing your app.
This is used as the name of the app in the app listing if `name` is not present.

### `author` (required)

This is the name of the author. It is prefered to use the same
names across multiple apps published to Paquet to share
verification status

> This property is not used often, so when not present,
> Paquet will look for an `author` meta tag in the web page.

### `description` (optional)

This is the description that will be shown on your app listing.

> Most apps do not have a `description` property, so Paquet
> will look for one in the web page if not present.

### `categories` (required)

This is usually an array of categories.
Paquet fetches this manifest property and reflects it to your app.
Only the available categories will be displayed.

Paquet also uses aliases so apps are better categorised.

[Here is a list of available categories.](https://paquet.app/category)

### `icons` (required)

Paquet will fetch the first maskable icon that is 96x96 pixels.

If this icon is not found, Paquet will search for 128x128, 192x192, 256x256, 512x512.
The first found will be set as icon.

### `screenshots`

We fetch for all screenshots no matter the size. We recomend
you to add screenshots for all suported devices. Screenshots
will also improve your visibility on Paquet.

### `theme_color`

We use the this variable to display the accent in the page listing.
This can be any hex variable.
