window.config = {
  environment: "production", // 或 'production'
  base_url: "https://learning.ardswc.gov.tw/",
};

// 根据环境切换配置（如果有需要）
if (config.environment === "production") {
  config.base_url = "https://learning.ardswc.gov.tw/";
}
