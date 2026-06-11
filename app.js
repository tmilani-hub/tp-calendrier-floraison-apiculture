const API = "http://10.69.4.8:3001/v1/";
const svg_star = `assets/star.svg`;
const svg_bee = `assets/abeille.svg`;
const svg_croix = `assets/croix.svg`;
const mounths = [
	"janvier",
	"février",
	"mars",
	"avril",
	"mai",
	"juin",
	"juillet",
	"août",
	"septembre",
	"octobre",
	"novembre",
	"décembre",
];

async function get_flowers(date) {
	const reponse = await fetch(API + `flowers?date=${date}`);
	const data = await reponse.json();
	return data;
}

function create_card_flower(
	img_url,
	bl_start,
	bl_end,
	name,
	desc,
	props,
	star_lngt,
) {
	const article = document.createElement("article");
	const img_1 = document.createElement("img");
	const divArt = document.createElement("div");
	const divEtoile = document.createElement("div");
	const h3 = document.createElement("h3");
	const divFlo = document.createElement("div");
	const divFloImg = document.createElement("div");
	const img_2 = document.createElement("img");
	const pFlo = document.createElement("p");
	const dateArt = document.createElement("p");
	const pDesc = document.createElement("p");
	const propriete = document.createElement("div");

	const prop_names = ["Propolis", "Nectar", "Pollen"];
	for (let i = 0; i < props.length && props.length == prop_names.length; i++) {
		const prop = document.createElement("div");
		const pProp = document.createElement("p");

		prop.classList.add("prop");
		pProp.classList.add("pProp");
		pProp.textContent = prop_names[i];

		prop.appendChild(pProp);

		if (props[i] == 0) {
			const img_croix = document.createElement("img");
			img_croix.src = svg_croix;
			prop.appendChild(img_croix);
		} else {
			const span = document.createElement("span");
			const progress = document.createElement("progress");
			span.textContent = props[i];
			progress.max = 100;
			progress.value = props[i] == 1 ? 33 : props[i] == 2 ? 66 : 100;
			prop.append(span, progress);
		}

		propriete.appendChild(prop);
	}

	propriete.classList.add("propriete");
	pDesc.classList.add("pDesc");
	dateArt.classList.add("dateArt");
	pFlo.classList.add("pFlo");
	divFloImg.classList.add("divFloImg");
	divFlo.classList.add("divFlo");
	h3.id = "h3Art";
	divEtoile.classList.add("divEtoile");
	divArt.classList.add("divArt");

	pDesc.textContent = desc;
	dateArt.textContent = `${mounths[bl_start - 1]} - ${mounths[bl_end - 1]}`;
	h3.textContent = name;
	pFlo.textContent = "Floraison";

	img_1.src = img_url;
	img_2.src = svg_bee;

	divFloImg.append(img_2, pFlo);
	divFlo.append(divFloImg, dateArt);

	for (let i = 0; i < star_lngt; i++) {
		const img = document.createElement("img");
		img.src = svg_star;
		divEtoile.appendChild(img);
	}
	divEtoile.style.backgroundColor =
		star_lngt == 1
			? "rgba(123, 27, 10, 1)"
			: star_lngt == 2
				? "rgba(10, 76, 123, 1)"
				: "rgba(63, 119, 74, 1)";

	divArt.append(divEtoile, h3, divFlo, pDesc, propriete);
	article.append(img_1, divArt);

	return article;
}

const $sectionDate = document.getElementById("sectionDate");
const $mon_conteneur = document.getElementById("mon-conteneur");

$sectionDate.addEventListener("submit", async (e) => {
	e.preventDefault();
	const Fdata = new FormData($sectionDate);
	const d_start = Fdata.get("start");
	const d_end = Fdata.get("end");

	const flowers = await get_flowers(d_start);
	console.log(flowers);
	for (let i = 0; i < flowers.length; i++) {
		const card_flower = create_card_flower(
			flowers[i].image,
			flowers[i].startBloom,
			flowers[i].endBloom,
			flowers[i].name,
			flowers[i].description,
			[flowers[i].propolis, flowers[i].nectar, flowers[i].pollen],
			flowers[i].melliferous,
		);
		$mon_conteneur.appendChild(card_flower);
	}
});

document.addEventListener("DOMContentLoaded", async () => {
	console.log("Hello World " + document.location);
});

/*
<article>
	<img class="img" src="http://10.69.4.8:3001/static/aubepine.png" alt="" />
	<div class="divArt">
		<div class="divEtoile" style="background-color: rgb(63, 119, 74)">
			<img src="assets/star.svg" alt="star" />
			<img src="assets/star.svg" alt="star" />
			<img src="assets/star.svg" alt="star" />
		</div>
		<h3 id="h3Art">Aubepine</h3>
		<div class="divFlo">
			<div class="divFloImg">
				<img src="assets/abeille.svg" alt="" />
				<p class="pFlo">Floraison</p>
			</div>
			<p class="dateArt">Avril - Juin</p>
		</div>
		<p class="pDesc">
			Cet arbrisseau herisse d'epines se reconnait a la forme de ses feuilles cn « V » a la
			base et decouples de lobes plus ou moins profonds. Les fleurs cn bouquets, blanches et
			odorantes, sont portees par de petits rameaux. Liles sont surtoul visitees lorsque les
			autres sources de nectar sont rares Flies permetteni la production d'un miel ires
			prise et donnent dcs fruits ovoides, rouges, qui font la joie des oiseaux. Cette
			espece s'adapte a tous types de sols et supporle aussi bicn la lumiere que la
			mi-ombre, f lie forme l'ossature de nombreuses hales sau- vages ou d'ornement, et des
			lisiercs foresticrcs.
		</p>
		<div class="propriete">
			<div class="prop">
				<p class="pProp">Propolis</p>
				<img src="assets/croix.svg" alt="croix" />
			</div>
			<div class="propValue">
				<p class="pProp">Nectar</p>
				<span class="pProp">2</span><progress max="100" value="66"></progress><img />
			</div>
			<div class="propValue">
				<p class="pProp">Pollen</p>
				<span class="pProp">3</span><progress max="100" value="100"></progress><img />
			</div>
		</div>
	</div>
</article>
*/
