# Pokémon Card Generator for Webflow

Holographic tilt card as a Code Component

This guide walks you through installing and using this card in Webflow, even if you have never used GitHub, Node, or written code before.

You will:

1. Install the tools on your computer
2. Import this card as a Webflow Code Component library
3. Use the “Holographic Pokémon Card” inside the Webflow Designer

---

## 0. What you need before you start

You should have:

* A Webflow account with access to:

  * A Workspace that supports **Libraries / Code components**
  * At least one site where you can use the component
* A computer (Mac or Windows) where you can install apps
* The project folder that contains:

  * `package.json`
  * `webflow.json`
  * `components/HolographicPokemonCard.tsx`
  * `components/HolographicPokemonCard.webflow.tsx`
  * `fonts/...`

If you got this as a ZIP file, unzip it first so you have a normal folder on your desktop or documents.

In this README, that folder will be called `pokemon-card-generator`.

---

## 1. Install Node.js (one time)

Node is the tool that lets the Webflow CLI and this project run.

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version for your system (the large button)
3. Run the installer you downloaded
4. Accept the defaults and finish the install

You only need to do this once on your computer.

---

## 2. Open the project folder in Terminal / Command Prompt

You need to run a few commands inside the project folder.

### On Mac

1. Open **Terminal**

   * Press `Command + Space`, type `Terminal`, press Enter
2. In Terminal, type `cd ` (with a space after it)
3. Drag the `pokemon-card-generator` folder from Finder into the Terminal window

   * This will fill in the path for you
4. Press Enter

Example (yours will look different):

```bash
cd /Users/yourname/Desktop/pokemon-card-generator
```

### On Windows

1. Open **Command Prompt**

   * Press `Windows key`, type `cmd`, press Enter
2. Type `cd ` (with a space)
3. Drag the `pokemon-card-generator` folder into the Command Prompt window
4. Press Enter

Example:

```bash
cd C:\Users\yourname\Desktop\pokemon-card-generator
```

You are now “inside” the project folder from the terminal.

---

## 3. Install the project dependencies

Still in the terminal, run:

```bash
npm install
```

What this does:

* Looks at `package.json`
* Downloads the tools the card needs:

  * `@webflow/webflow-cli`
  * `@webflow/react`
  * `@webflow/data-types`
  * `lucide-react`

This may take a minute. When it finishes, the command prompt will come back and you will see a `node_modules` folder inside the project.

---

## 4. Authenticate with Webflow and share the library

Now you will send this card into your Webflow Workspace as a **Code Component Library**.

In the same terminal window, run:

```bash
npx webflow library share
```

The first time you run this:

1. Your browser will open and ask you to log in to Webflow
2. It may ask you which **Workspace** to use
3. Approve access when Webflow asks

The command will then:

* Find `webflow.json`
* Bundle the code in `components/*.webflow.tsx`
* Upload a library named **“Pokemon Card Generator”** to your Webflow Workspace

If the CLI asks which components to share, accept the defaults and continue.

When it finishes, you should see a success message in the terminal.

You only need to run `npx webflow library share` again when you change the code and want to update the library.

---

## 5. Attach the library to your Webflow site

Now switch to Webflow in your browser.

1. Go to the Webflow **Dashboard**
2. Open the Workspace where you shared the library
3. Go to **Libraries** for that Workspace

   * You should see a library named **“Pokemon Card Generator”**
4. Make sure it is available to the site you want to use

   * If there is an option to connect it to a specific site, connect it

Then:

1. Open the Webflow **Designer** for your site
2. In the left panel, open the **Components / Libraries** panel (name may vary)
3. In the Libraries area, connect the **“Pokemon Card Generator”** library to this site if it is not already connected

Once connected, the components from this library become available in the Designer.

---

## 6. Use the “Holographic Pokémon Card” component

In the Webflow Designer:

1. Open the **Add / Components** panel

2. Look for a component named:

   * **Holographic Pokémon Card**
   * Group: **Cards**

3. Drag **Holographic Pokémon Card** onto the page where you want it

With the component selected, open the **Component properties panel** (usually in the right sidebar). You will see controls defined in `HolographicPokemonCard.webflow.tsx`, including:

* **Card group**

  * Name (text, for example “Pikachu”)
  * Genus (for example “Mouse Pokémon”)
  * Dex Number (for example “025”)
  * Flavor Text (rich text block)

* **Stats group**

  * HP (number)
  * Height (m)
  * Weight (kg)

* **Card group / Styling group**

  * Primary Type (dropdown: fire, water, electric, etc)
  * Color Theme (dropdown: yellow, blue, red, etc)

* **Media group**

  * Sprite Image (URL to a Pokémon artwork image)

* **Behavior group**

  * Show motion prompt on mobile (toggle)

Change values and watch the card update in real time.

---

## 7. How the font and holographic effect work

You do not need to configure anything for this, but for context:

* The component includes its own CSS inside the React component
* It loads a **Pokémon style font** and a **noise texture** from URLs
* The holographic shimmer uses:

  * CSS gradients
  * SVG filters
  * Mouse movement on desktop
  * Optional device motion (tilt) on mobile

Everything needed for that is bundled inside the component library. Once the library is shared and connected, the effect works automatically.

---

## 8. Common problems and quick fixes

**The command `npm` is not found**

* Node is not installed or you need to restart your terminal
* Install Node from [https://nodejs.org](https://nodejs.org) and open a new Terminal / Command Prompt window

**The command `npx webflow library share` fails with “webflow.json not found”**

* Make sure you ran `cd` into the `pokemon-card-generator` folder before running the command

**I cannot see “Pokemon Card Generator” in Webflow**

* Check that the `npx webflow library share` command finished without errors
* In Webflow:

  * Go to the Workspace
  * Open **Libraries** and confirm the library is listed
  * Connect that library to your site
  * Reopen the Designer and check the Components panel again

---

## 9. Updating the card in the future

If you ever receive an updated version of this project:

1. Replace the project folder on your computer with the new one
2. Open Terminal in that folder
3. Run:

```bash
npm install
npx webflow library share
```

Webflow will update the library, and your sites using this component will get the new version.

---

That is it. From here you can duplicate the card, style around it in Webflow, and use it anywhere in your site like any other component.
