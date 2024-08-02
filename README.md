# Spore

## Getstarted

Install Dependencies
```
pnpm i
```

## Spore

### Enviroment Values
```
cp apps/spore/.env.example apps/spore/.env
```

### Run Spore

Start API
```
pnpm spore run server
```

Then start frontend
```
pnpm spore run dev
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
✅ Linked to mycel-labs/spore (created .vercel)
```

Run App
```
vercel dev
```

### Run Spore og:mage endpoint
```
pnpm spore-og run dev
```
