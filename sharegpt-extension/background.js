const serverUrl = 'https://sharegpt.com';
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "share" && request.data) {
        shareConversation(request, sendResponse).then(() => {
            console.log('onMessage - share success');
        }).catch((err) => {
            console.log('onMessage - share error', err);
        });

        // flag to indicate that we will send a response asynchronously
        return true;
    }
});

/**
 * share to share gpt server
 * @param request
 * @param sendResponse
 * @returns {Promise<unknown>}
 */
async function shareConversation(request, sendResponse) {
    return new Promise(async (resolve, reject) => {
        try {
            // session of user is shared with extension popup,
            // by this a logged in user has a valid session
            const res = await fetch(`${serverUrl}/api/conversations`, {
                body: JSON.stringify(request.data),
                headers: {"Content-Type": "application/json"},
                method: "POST",
            })

            if (res.status === 200) {
                const {id} = await res.json();
                const url = `${serverUrl}/c/${id}`;

                // open new tab with shared conversation
                chrome.tabs.create({url: url});

                sendResponse({shared: true});

                resolve();
            } else if (res.status === 401) {
                sendResponse({shared: false, error: 'Unauthorized'});
            } else {
                sendResponse({shared: false, error: 'Unknown error'});
            }

        } catch (err) {
            console.log('onMessage - share error', err);
            sendResponse({shared: false, error: err.message});
            reject(err);
        }
    });
}