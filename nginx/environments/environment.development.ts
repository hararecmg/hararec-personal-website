export const environment = {
    production: false,
    openAiApiKey: process.env.NG_OPENAI_API_KEY,
    openAiOrganizationId: process.env.NG_OPENAI_ORGANIZATION_ID,
    pexelApiKey: process.env.NG_PEXEL_API_KEY,
    formspreeId: process.env.NG_FORMSPREE_ID,
    modalIsDysplayed: process.env.NG_SECONDS_IN_WHICH_MODAL_SALE_IS_DISPLAYED,
    pexelBaseUrl: 'http://localhost/api/pexels',
    openAiBaseUrl: 'http://localhost/api/openai',
    formspreeBaseUrl: 'https://localhost/api/formspree',
};
