function capitalize(text: string) {
    return text.toLowerCase().replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
}

function formatDate(dateText: string) {
    const date = new Date(dateText);
    const hour = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const day = date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });

    return `${day} ${hour}`;
};

export { capitalize, formatDate }