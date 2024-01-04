function capitalize(text: string) {
    return text.toLowerCase().replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
}

export { capitalize }