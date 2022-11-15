import sanityClient from "@sanity/client";

const client = sanityClient({
    projectId: "n2amzrlx",
    dataset: "production",
    apiVersion: "2022-10-21",
    token:'skvaNC5BHN2TTNrHa9imGGe9n6fg8xY2OFSejSVKxLGbbPFw2ITwivky2NbTfFVuZjwWEelH1jx7ng7BEiIH3IYgGXzKclyDNhxE3OaRUWcPgsKq0zXeBNMJxpmyxuDHerpcUtTnlLArX6RxOKa4xOqU8H357XNpoElfsN9YmxzWSnFzlUwE',
    useCdn: false
  });

export default client;