export type HighstormEvent = {
    /**
     * Unix timestamp with millisecond precision of when the event happened
     *
     * @default Date.now()
     */
    time?: number;
    /**
     * The title of the event
     */
    event: string;
    /**
     * Optional content
     */
    content?: string;

    /**
     * Optional key-value metadata
     */
    metadata?: Record<string, string | number | boolean | null>;
};

export async function highstorm(
    channel: string,
    event: HighstormEvent,
): Promise<void> {
    const token = process.env.HIGHSTORM_TOKEN;
    if (!token) {
        return
    }
    try {
        const res = await fetch(`https://highstorm.app/api/v1/events/${channel}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(event),
        });
        if (!res.ok) {
            throw new Error(`Unable to ingest event: ${await res.text()}`);
        }
        return await res.json();
    } catch (err) {
        console.warn(err);
    }
}
