// lancer en tapant dans la console :
// node --experimental-strip-types tests_cars.ts

import cars from "./cars.json" with { type: 'json' };

//** Compléter les en écrivant les parties :  */
/* TODO */
/* Désactiver COPILOT pour que vous fassiez l'effort de lire */

console.log("=== EXEMPLES DES MÉTHODES ARRAY AVEC LES DONNÉES CARS ===\n");
console.log(`Nombre total de voitures: ${cars.length}\n`);

// ===== MÉTHODES D'ACCÈS AUX ÉLÉMENTS =====

console.log("--- MÉTHODES D'ACCÈS AUX ÉLÉMENTS ---");

// at() - Accède à un élément par son indice (accepte les indices négatifs)
console.log("• at() - Première voiture:", cars.at(0)?.name);
console.log("• at() - Dernière voiture:", cars.at(-1)?.name);
console.log();

// slice() - Extrait une portion du tableau
console.log("• slice() - Les 3 premières voitures:");
console.log(cars.slice(0, 3).map(c => `${c.name} (${c["economy (mpg)"]} mpg)`));
console.log();

// ===== MÉTHODES DE RECHERCHE ET VÉRIFICATION =====

console.log("--- MÉTHODES DE RECHERCHE ET VÉRIFICATION ---");

// find() - Trouve le premier élément qui satisfait une condition
const premiereFord = cars.find(c => c.name.toLowerCase().includes("ford"));
console.log("• find() - Première Ford:", premiereFord?.name);

// findIndex() - Trouve l'indice du premier élément qui satisfait une condition
const indexFord = cars.findIndex(c => c.name.toLowerCase().includes("ford"));
console.log("• findIndex() - Index de la première Ford:", indexFord);

// indexOf() - Trouve l'indice d'un élément (comparaison stricte)
const marques = cars.map(c => c.name.split(' ')[0]);
console.log("• indexOf() - Index de 'Toyota' dans la liste des marques:", marques.indexOf("Toyota"));

// lastIndexOf() - Trouve le dernier indice d'un élément
console.log("• lastIndexOf() - Dernier index de 'Chevrolet':", marques.lastIndexOf("Chevrolet"));

// includes() - Vérifie si un élément existe dans le tableau
const origines = cars.map(c => c.year);
console.log("• includes() - Année '82' existe-t-elle?", origines.includes(82));

// some() - Teste si au moins un élément satisfait une condition
const auMoinsUneEconomique = cars.some(c => c["economy (mpg)"] != null && c["economy (mpg)"] > 40);
console.log("• some() - Y a-t-il des voitures > 40 mpg?", auMoinsUneEconomique);

// every() - Teste si tous les éléments satisfent une condition
const toutesOntEconomie = cars.every(c => c["economy (mpg)"] != null && c["economy (mpg)"] > 0);
console.log("• every() - Toutes ont une consommation > 0?", toutesOntEconomie);
console.log();

// ===== MÉTHODES DE FILTRAGE =====

console.log("--- MÉTHODES DE FILTRAGE ---");

// filter() - Crée un nouveau tableau avec les éléments qui passent un test
const voituresV8 = cars.filter(c => c.cylinders === 8);
console.log("• filter() - Nombre de V8:", voituresV8.length);

const voituresEconomiques = cars.filter(c => c["economy (mpg)"] != null && c["economy (mpg)"] > 30);
console.log("• filter() - Voitures > 30 mpg:", voituresEconomiques.length);
console.log();

// ===== MÉTHODES DE TRANSFORMATION =====

console.log("--- MÉTHODES DE TRANSFORMATION ---");

// map() - Transforme chaque élément et crée un nouveau tableau
const descriptions = cars.slice(0, 3).map(c => 
    `${c.name} (${c.cylinders} cyl) - ${c["economy (mpg)"]} mpg`
);
console.log("• map() - Descriptions des 3 premières:");
descriptions.forEach(desc => console.log("  ", desc));

/* IMPORTANT : noter ce code 
 * L'usage de `map` pour n'extraire qu'une propriété.
 * Et l'usage de `[...new Set()]` sur le résultat pour ne garder que les noms uniques
 * Cela servira pour le prochain TP
 */
const nomsMarques = cars.map(c => c.name.split(' ')[0]);
console.log("• map() - Marques uniques:", [...new Set(nomsMarques)].slice(0, 10));

// flatMap() - Applique une fonction puis aplatit d'un niveau
const caracteristiques = cars.slice(0, 2).flatMap(c => 
    [c.name.split(' ')[0], c.cylinders.toString(), c.year.toString()]
);
console.log("• flatMap() - Caractéristiques aplaties:", caracteristiques);

// reduce() - Réduit le tableau à une seule valeur
const puissanceTotale = cars.reduce((total, c) => 
    c["power (hp)"] != null ? total + c["power (hp)"] : total, 0
);
console.log("• reduce() - Puissance totale:", puissanceTotale, "chevaux");

const nbrParMarque = cars.reduce((acc, c) => {
    const marque = c.name.split(' ')[0];
    acc[marque] = (acc[marque] || 0) + 1;
    return acc;
}, {} as Record<string, number>);
console.log("• reduce() - Comptage par marque (top 5):", 
    Object.entries(nbrParMarque).sort((a, b) => b[1] - a[1]).slice(0, 5));

// reduceRight() - Réduit de droite à gauche
const dernieresMarques = cars.slice(-3).reduceRight((acc, c) => 
    acc + c.name.split(' ')[0] + " ", ""
);
console.log("• reduceRight() - 3 dernières marques (inversées):", dernieresMarques.trim());
console.log();

// ===== MÉTHODES DE TRI =====

console.log("--- MÉTHODES DE TRI ---");

// sort() - Trie les éléments (modifie le tableau original)
const puissancesCopie = cars.slice(0, 5).map(c => c["power (hp)"]).filter(p => p != null);
console.log("• sort() - Puissances avant tri:", puissancesCopie);
puissancesCopie.sort((a, b) => a - b); // différence pour tri
console.log("• sort() - Puissances après tri croissant:", puissancesCopie);

// Tri par marque
const voituresParMarque = cars.slice(0, 10).sort((a, b) => 
    a.name.split(' ')[0].localeCompare(b.name.split(' ')[0])
);
console.log("• sort() - 10 premières triées par marque:");
voituresParMarque.forEach(c => console.log(`  ${c.name.split(' ')[0]} - ${c.name}`));
console.log();

// ===== MÉTHODES D'ITÉRATION =====

console.log("--- MÉTHODES D'ITÉRATION ---");

// forEach() - Exécute une fonction pour chaque élément
console.log("• forEach() - Affichage des 3 premières voitures:");
cars.slice(0, 3).forEach((c, index) => {
    console.log(`  ${index + 1}. ${c.name} - ${c.cylinders} cylindres (${c["power (hp)"]} hp)`);
});

// ===== MÉTHODES DE CONVERSION =====

console.log("--- MÉTHODES DE CONVERSION ---");

// join() - Joint tous les éléments en une chaîne
const premieresMarques = cars.slice(0, 5).map(c => c.name.split(' ')[0]);
console.log("• join() - Marques séparées par ' | ':", premieresMarques.join(" | "));
console.log("• join() - Marques séparées par des virgules:", premieresMarques.join(", "));

// toString() - Convertit en chaîne (équivalent à join(','))
console.log("• toString() - Premières puissances:", cars.slice(0, 3).map(c => c["power (hp)"]).toString());
console.log();

// ===== MÉTHODES DE CONCATÉNATION =====

console.log("--- MÉTHODES DE CONCATÉNATION ---");

// concat() - Joint des tableaux
const fords = cars.filter(c => c.name.toLowerCase().includes("ford")).slice(0, 2);
const chevrolets = cars.filter(c => c.name.toLowerCase().includes("chevrolet")).slice(0, 2);
const melange = fords.concat(chevrolets);
console.log("• concat() - Mélange Fords + Chevrolets:");
melange.forEach(c => console.log(`  ${c.name.split(' ')[0]} - ${c.name}`));
console.log();

// ===== MÉTHODES D'APLATISSEMENT =====

console.log("--- MÉTHODES D'APLATISSEMENT ---");

// flat() - Aplatit les tableaux imbriqués
const groupesParDecennie = [
    cars.filter(c => c.year >= 70 && c.year < 75).slice(0, 2).map(c => c.name.split(' ')[0]),
    cars.filter(c => c.year >= 75 && c.year < 80).slice(0, 2).map(c => c.name.split(' ')[0]),
    cars.filter(c => c.year >= 80).slice(0, 2).map(c => c.name.split(' ')[0])
];
console.log("• flat() - Groupes par décennie avant aplatissement:", groupesParDecennie);
console.log("• flat() - Après aplatissement:", groupesParDecennie.flat());
console.log();

// ===== STATISTIQUES FINALES =====

console.log("--- STATISTIQUES FINALES ---");

// Calculs statistiques utilisant différentes méthodes
const puissances = cars.map(c => c["power (hp)"]).filter(p => p != null);
const puissanceTotaleCalc = puissances.reduce((sum, power) => sum + power, 0);
const puissanceMoyenne = puissanceTotaleCalc / puissances.length;
const puissanceMin = Math.min(...puissances);
const puissanceMax = Math.max(...puissances);

console.log("• Statistiques des puissances:");
console.log(`  - Puissance moyenne: ${puissanceMoyenne.toFixed(1)} hp`);
console.log(`  - Puissance minimale: ${puissanceMin} hp`);
console.log(`  - Puissance maximale: ${puissanceMax} hp`);

// Répartition par nombre de cylindres
const repartitionCylindres = cars.reduce((acc, c) => {
    acc[c.cylinders] = (acc[c.cylinders] || 0) + 1;
    return acc;
}, {} as Record<number, number>);
console.log("• Répartition par cylindres:", repartitionCylindres);

// Répartition par décennie
const repartitionDecennie = cars.reduce((acc, c) => {
    const decennie = Math.floor(c.year / 10) * 10;
    acc[decennie] = (acc[decennie] || 0) + 1;
    return acc;
}, {} as Record<number, number>);
console.log("• Répartition par décennie:", repartitionDecennie);

// =============================================
// GROUPEMENT DES DONNÉES AVEC Object.groupBy
// =============================================

console.log("\n--- GROUPEMENT AVEC Object.groupBy ---");

// Groupement par nombre de cylindres
console.log("• Object.groupBy() - Répartition par cylindres:");
const voituresParCylindres = Object.groupBy(cars, c => c.cylinders);
for (const [cylindres, voitures] of Object.entries(voituresParCylindres)) {
    console.log(`  ${cylindres} cylindres: ${voitures?.length || 0} voitures`);
}

// Groupement par marque et décennie combinés
console.log("\n• Object.groupBy() - Répartition par marque et décennie:");
const voituresParMarqueEtDecennie = Object.groupBy(cars, voiture => {
    const marque = voiture.name.split(' ')[0];
    const decennie = Math.floor(voiture.year / 10) * 10;
    return `${marque} - ${decennie}s`;
});

// Groupement par décennie
console.log("\n• Object.groupBy() - Répartition par décennie:");
const voituresParDecennie = Object.groupBy(cars, c => Math.floor(c.year / 10) * 10);
for (const [decennie, voitures] of Object.entries(voituresParDecennie)) {
    console.log(`  ${decennie}s: ${voitures?.length || 0} voitures`);
}

// Groupement par catégorie de consommation (économique, normale, gourmande)
console.log("\n• Object.groupBy() - Répartition par catégorie de consommation:");
const voituresParCategorieConsommation = Object.groupBy(cars, voiture => {
    const mpg = voiture["economy (mpg)"];
    if (!mpg) return 'consommation inconnue';
    if (mpg >= 30) return 'économique';
    if (mpg >= 20) return 'normale';
    return 'gourmande';
});

Object.entries(voituresParCategorieConsommation)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([categorie, voitures]) => {
        console.log(`  ${categorie}: ${voitures?.length || 0} voitures`);
    });

console.log("\n=== FIN DES EXEMPLES ===");

/* TODO Faire de même pour d'autres dataset : https://observablehq.com/@observablehq/sample-datasets */
