export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getToday = () => {
    const date = new Date();
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const today = date.toLocaleString("pt-br", options);

    return today;
};
