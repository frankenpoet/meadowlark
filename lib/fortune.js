var fortuneCookies = [
        "You will never succeed... give up now!",
    "It will rain all day... and then it will rain more...",
    "Today you will discover that your parents are aliens from another planet and that you are actually a plant.",
    "People that believe in you are misguided.",
    "The safest place to stand in not where you are standing... ever."
];

exports.getFortune = function() {
    var idx = Math.floor(Math.random() * fortuneCookies.length);
    return fortuneCookies[idx];
};
