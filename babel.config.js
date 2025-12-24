module.exports = {
  presets: [
    "next/babel", // mantém a configuração Next.js
    [
      "@babel/preset-react", // adiciona runtime automático
      { runtime: "automatic" },
    ],
  ],
};
