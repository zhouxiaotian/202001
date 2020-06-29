const initialstate = {
	data: []
};
export default function task(state = initialstate, action) {
	state = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		
	}
	return state;
};