export async function fetchData(params = "/authentication") {
	const res = await fetch(`https://api.themoviedb.org/3${params}`, {
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDIzZGIyY2Q2YWI0OTg3M2VhOTMwZDAxYTRhYzhiNSIsInN1YiI6IjY1MDViODVjM2NkMTJjMDBlYjQ0MWZjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tGb22ymkKWGixA41g3vY9KNO6nwMr-neLK2CmD9Bkgk",
		},
		method: "GET",
	});
	return await res.json();
}
