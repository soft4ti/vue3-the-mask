# The Mask

A lightweight (2KB gzipped) and dependency free mask input created specific for Vue 3

> [Docs and Demo](https://soft4ti.github.io/vue-the-mask)

## Install

```
yarn add vue-the-mask
or
npm i -S vue-the-mask
```

## Usage (two flavors)

### Global

```javascript
import VueTheMask from "vue-the-mask";
app.use(VueTheMask);
```

### Local (inside the component)

```javascript
import { TheMask } from "vue-the-mask";
export default {
  components: { TheMask },
};
```

### Local (as directive)

```javascript
import { mask } from "vue-the-mask";
export default {
  directives: { mask },
};
```

## Tokens

```javascript
'#': {pattern: /\d/},
'X': {pattern: /[0-9a-zA-Z]/},
'S': {pattern: /[a-zA-Z]/},
'A': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
'a': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase()},
'!': {escape: true}
```

## Properties

| Property    | Required | Type          | Default           | Description                                |
| ----------- | -------- | ------------- | ----------------- | ------------------------------------------ |
| value       | false    | String        |                   | Input value or v-model                     |
| mask        | **true** | String, Array |                   | Mask pattern                               |
| masked      | false    | Boolean       | false             | emit value with mask chars, default is raw |
| placeholder | false    | String        |                   | Same as html input                         |
| type        | false    | String        | 'text'            | Input type (email, tel, number, ...)       |
| tokens      | false    | Object        | [tokens](#tokens) | Custom tokens for mask                     |

## Contribution

You're free to contribute to this project by submitting [issues](https://github.com/soft4ti/vue-the-mask/issues) and/or [pull requests](https://github.com/soft4ti/vue-the-mask/pulls). This project is test-driven, so keep in mind that every change and new feature should be covered by tests. Your name will be added to the hall of fame ;)

## License

This project is licensed under [MIT License](https://opensource.org/licenses/MIT)
