module.exports = {
    fetchDay: 0,
    matches: [],
    putMatches: function(matches) {
        this.matches = matches;
        this.fetchDay = this.getCurrentDay();
    },
    getMatches: function() {
        return (this.fetchDay >= this.getCurrentDay()) ? this.matches : [];
    },
    getCurrentDay: function () {
        return Math.floor(new Date() / 8.64e7);
    }
}