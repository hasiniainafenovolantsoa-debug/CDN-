// open-next.config.ts
const config = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "dummy",
    },
  },
};

export default config;
