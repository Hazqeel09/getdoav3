// This file is only to store features, but requires to import icons, so I will leave it as tsx for now

type Feature = {
  title: string;
  description: string;
  // Keep as unknown as we figure out the icon pack
  icon: unknown;
}

type Features = {
  public: Feature[];
  sign_up: Feature[];
};

export const features: Features = {
  public: [
    {
      title: "Create Doa",
      description: "Start creating your own doa with ease.",
      icon: <></>,
    },
    {
      title: "Browse Doa",
      description: "Browse other people shared doa to get new idea of your custom doa.",
      icon: <></>,
    },
    {
      title: "Doa with reference",
      description: "Ease your concern about the legitimacy of the document with the right source of reference.",
      icon: <></>,
    },
    {
      title: "Tutorial guidance",
      description: "Getting lost? No need to worry, just watch our tutorial for guidance on creating the doa.",
      icon: <></>,
    }
  ],
  sign_up: [
    {
      title: "AI Doa Verifier",
      description: "Learn how to use GetDoa with helpful tutorials.",
      icon: <></>,
    },
    {
      title: "Download your doa",
      description: "You can download your customized Doa and access it offline as well.",
      icon: <></>,
    },
    {
      title: "Write the Doa in your preferred language",
      description: "Express your thoughts and wishes through your own words either in Malay or English.",
      icon: <></>,
    },
    {
      title: "Shareable with QR",
      description: "Your custom Doa is also link-shareable.",
      icon: <></>,
    },
    {
      title: "Bookmark favourites doa",
      description: "You can even star your favourites finding doa.",
      icon: <></>,
    }
  ],
};