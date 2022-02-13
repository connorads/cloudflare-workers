interface Environment {
    ACCOUNT_ID?: string;
    API_KEY?: string;
    EMAIL?: string;
    PROJECT_NAME?: string;
}

export default {
    async scheduled(event: ScheduledEvent, env: Environment, ctx: ExecutionContext) {
        ctx.waitUntil(buildPage(env))
    },
    async fetch(request: Request, env: Environment): Promise<Response> {
        return buildPage(env);
    },
}

async function buildPage({ ACCOUNT_ID, PROJECT_NAME, EMAIL, API_KEY }: Environment) {
    if (ACCOUNT_ID && PROJECT_NAME && EMAIL && API_KEY) {
        console.log(`Requesting deployment: ${JSON.stringify({ ACCOUNT_ID, PROJECT_NAME })}`)
        const endpoint =
            `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments`;
        const init = {
            method: "POST",
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "X-Auth-Email": EMAIL,
                "X-Auth-Key": API_KEY,
            },
        };
        const response = await fetch(endpoint, init);
        if (!response.ok) throw new Error("Non-ok response recieved from deployment API")
        console.log("Deployment requested")
    }

    return new Response();
}