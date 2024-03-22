# Spore

## Getstarted
Install Dependencies
```
pnpm i
```

## Spore


### Enviroment Values
```
cd apps/spore
```

```
cp .env_example .env
```

### Run Spore
```
cd apps/spore
```

Start API
```
pnpm run server
```

Then start frontend
```
pnpm run dev
```

### Run Spore with `vercel dev`
Setup vercel
```
vercel link
```

```
Vercel CLI 33.6.1
? Set up “~/dev/mycel/frontend”? [Y/n] y
? Which scope should contain your project? Mycel
? Found project “mycel-labs/frontend”. Link to it? [Y/n] n
? Link to different existing project? [Y/n] y
? What’s the name of your existing project? spore
✅  Linked to mycel-labs/spore (created .vercel)
```

Run App
```
vercel dev
```
