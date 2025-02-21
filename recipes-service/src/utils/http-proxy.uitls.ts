// import {createProxyMiddleware} from 'http-proxy-middleware'

// const servicePortMapping = new Map<string, string>([
// 	['onephase-api', process.env.ONEPHASE_HTTP_PORT],
// 	['cascade-api', process.env.CASCADE_HTTP_PORT],
// 	['condenser-api', process.env.CONDENSER_HTTP_PORT],
// 	['document-api', process.env.DOCUMENT_HTTP_PORT],
// 	['evaporator-api', process.env.EVAPORATOR_HTTP_PORT],
// 	['mfile-api', process.env.MFILE_HTTP_PORT],
// 	['multi-condenser-api', process.env.MULTI_CONDENSER_HTTP_PORT],
// 	['partial-cascade-api', process.env.PARTIAL_CASCADE_HTTP_PORT],
// 	['cpq-api', process.env.CPQ_HTTP_PORT],
// 	['search-api', process.env.SEARCH_HTTP_PORT],
// 	['notification-api', process.env.NOTIFICATION_HTTP_PORT],
// 	['jci-integration-api', process.env.JCI_HTTP_PORT],
// 	['excel-exporter-api', process.env.EXCEL_EXPORTER_HTTP_PORT],
// 	['pricing-api', process.env.PRICING_HTTP_PORT],
// ])
// export const httpProxyMiddleware = createProxyMiddleware({
// 	router: function (req) {
// 		const serviceName = req.originalUrl.split('/')[2]
// 		if (process.env.APP_ENV == 'local' || process.env.APP_ENV == 'testing')
// 			return `http://localhost:${servicePortMapping.get(serviceName)}`
// 		else return `http://${serviceName}:${servicePortMapping.get(serviceName)}`
// 	},
// 	pathRewrite: {
// 		'^/proxy': '',
// 	},
// })

// export const websocketProxyMiddleware = createProxyMiddleware({
// 	router: function () {
// 		if (process.env.APP_ENV == 'local')
// 			return `ws://localhost:${servicePortMapping.get('cpq-api')}`
// 		else return `ws://cpq-api:${servicePortMapping.get('cpq-api')}`
// 	},
// 	ws: true,
// })
