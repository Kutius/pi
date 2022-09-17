# pi

pi - Choose the server you want to connect.

```bash
pnpm i -g craco-pi
```

or use

```bash
pnpx craco-pi
```

## Usage

By default, `pi` will read the `craco.config.js` file in the current directory.

`pi` will use `~/.pirc` as profile if exists. There are some persist data to save high frequency use of IP. 

And then you can use argument `-i` to add an ip to the profile for persistence.

```bash
pi -i 192.168.3.128
```

Certainly, you can just use

```bash
pi -i 3.128
```

It is by default added the prefix `192.168.` to the server ip.

To select the server which is in the profile, you can use `-s` to choose one.

```bash
pi -s
```

## Sponsors



## License

[MIT](./LICENSE) License © 2022 [今夜白](https://github.com/gaaraly)
