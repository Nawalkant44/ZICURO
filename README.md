# ZICURO - React Draft.js Editor with Custom Formatting

ZICURO is a simple and powerful text editor built using **React** and **Draft.js**. The editor allows users to apply custom inline styles (like **bold**, **red text**, and **underlined black text**) and block styles (such as **headers**). It also supports saving and loading content to/from the browser's local storage.

## Features

- **Custom Formatting**:

  - Type `#` followed by a space to apply a **heading** (header-one).
  - Type `*` followed by a space to make the text **bold**.
  - Type `**` followed by a space to change the text color to **red**.
  - Type `***` followed by a space to apply **underlined black text**.

- **Local Storage**: The content is saved to the browser's local storage, allowing users to retrieve the content after reloading the page.

## Installation

Follow these steps to get started with **ZICURO**:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Nawalkant44/ZICURO.git
   ```

2. **Navigate into the project directory**:

   ```bash
   cd ZICURO
   ```

3. **Install the dependencies**:

   ```bash
   npm install
   npm install draft-js@latest
   ```

4. **Run the development server**:

   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to see the editor in action.

## How It Works

### Editor State Management:

- The editor state is managed using **React's `useState`** hook.
- Draft.js’s `EditorState` is used to handle the editor's content and styling.

### Content Saving:

- The editor's content is saved automatically in **localStorage** using `convertToRaw` and `convertFromRaw` from Draft.js.
- On page reload, the content is retrieved from localStorage and restored to the editor.

### Custom Formatting:

- The editor applies inline styles using a custom style map, allowing bold, red text, and underlined black text.
- Special block types, like headers, are applied based on typing specific characters like `#`.

### Block Type Changes:

- Typing `#` followed by a space changes the block type to a `header-one` (a heading).
- Other styles are applied based on specific character combinations such as `*` and `**`.

## How to Use ZICURO Editor

1. **Applying Formatting**:

   - **Heading**: Type `#` followed by a space to apply a **heading**.
   - **Bold**: Type `*` followed by a space to make the text **bold**.
   - **Red Text**: Type `**` followed by a space to make the text **red**.
   - **Underlined Black Text**: Type `***` followed by a space to apply **underlined black text**.

2. **Saving Content**:

   - To save your current content, click on the **Save** button, and the content will be stored in **localStorage**.
   - On page reload, the content will be automatically loaded from **localStorage**.

3. **Custom Styles**: The editor supports both inline styles and block types, and you can apply them by typing the triggers followed by a space.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Draft.js**: A framework for building rich text editors in React.
- **CSS**: For styling the editor and its components.

## Example Screenshots

_You can include screenshots here to demonstrate how the editor looks._

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Draft.js**: Used for building the rich text editor in React.
- **React**: Used for building the UI of the application.

## Contributing

If you would like to contribute to **ZICURO**, feel free to fork the repository, make your changes, and submit a pull request.
