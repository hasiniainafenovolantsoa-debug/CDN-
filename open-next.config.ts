// open-next.config.ts
const config = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge", // Izao no ovaina ho "edge"
    },
  },
};

export default config;

