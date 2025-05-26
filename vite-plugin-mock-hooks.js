// vite-plugin-mock-hooks.js
export default function mockHooksPlugin() {
  return {
    name: 'vite-plugin-mock-hooks',
    transformIndexHtml(html) {
      return html.replace(
        '</head>',
        `<script>
          window.useAuth = function() {
            return {
              user: { id: '1', name: 'User', email: 'user@example.com' },
              login: async function() { console.log('Mock login'); },
              logout: function() { console.log('Mock logout'); },
              isAuthenticated: true,
              isLoading: false
            };
          };
          
          window.useApi = function() {
            return {
              baseUrl: 'https://api.example.com',
              get: async function( ) { return { success: true, data: { message: 'Mock data' } }; },
              post: async function() { return { success: true, data: { message: 'Mock data created' } }; },
              put: async function() { return { success: true, data: { message: 'Mock data updated' } }; },
              delete: async function() { return { success: true, data: { message: 'Mock data deleted' } }; },
              isLoading: false
            };
          };
        </script></head>`
      );
    }
  };
}
