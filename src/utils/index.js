export const getToken = () => {
    let token = localStorage.getItem("accessToken");
    return token;
  };


export const categoryForms = [
  {name: "Handmade cosmetics", value:"handMadeCosmetics"},
  {name: "Oils", value:"oils"},
  {name: "Herbs", value:"herbs"},
  {name: "Block Busters", value:"blockBusters"},
  {name: "Healthy Alternatives", value:"healthyAlternatives"},

]

export const productsForm = {
  handMadeCosmetics: "new-handmade-cosmetic",
  healthyAlternatives: "new-healthy-alternative",
  blockBusters: "new-blockbuster",
  oils: "new-oil",
  herbs: "new-herb"
}