export async function GET() {
    // For example, fetch data from your DB here
    const categories = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
    ];
    return new Response(JSON.stringify(categories), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

