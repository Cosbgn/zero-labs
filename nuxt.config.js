export default {
	target: 'static',
	head: {
		title: 'zero-labs',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			// { "http-equiv":"refresh", content:"0", url:"https://zero.sh/labs"},
		],
		link: [ { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' } ]
  	},
	css:[],
  	plugins:[],
  	components: false,
	buildModules: ['@nuxtjs/tailwindcss'],
	modules: [],
	axios: {},
	build: {
	}
}
