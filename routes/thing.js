var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
	console.log(req);
	res.send(req.body);
});

/* create one of three different mocked office datas
 * @param i which office data to return
 */
function createMockOffice(i){
	switch(i){
		default:
		case 1:
			return {
				country : "USA",
				city : "Portland",
				address : "5118 N Yale St."
			};
		case 2:
			return {
				country : "Lietuva",
				city : "Vilnius",
				address : "Zalgirio 135"
			};
		case 3:
			return {
				country : "Lietuva",
				city : "Kaunas",
				address : "Juozapaviciaus 11D"
			};
	}
}

module.exports= router;