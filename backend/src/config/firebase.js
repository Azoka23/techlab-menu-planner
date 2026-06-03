import admin from "firebase-admin";

// Pegamos el string largo de tu clave privada literal
const rawPrivateKey =
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBKfLSR7aQWlzE\nf+P5mLWhdhNByLyddL1ZTd7vGrKOUDYy0uD9FUsT7oX+Za4B7u1phds1K3GjGYeI\nnucAtE47rKUZ3JllawxYm+Awea+NTX4ptDDWf4og8TWDavgrc6IdLFvg04IyS7oy\nbKqNpSZR+qq29vVzYPkiUTcpftsc9sAZQvOtK+6u4D5h3dBCWHnXrOcWhXlYegip\nBC/2uoC/TrwyAtI/FEj6AwZSKWBRtWFMHgYHNU9fWhNFIwWe5zSZkyc6i8gjT+FX\n7fzVRMV+hJ25EZHHvLuQCsc19zJ0ESEILj6y6glbnL1j2AwJm6muOCrsgimXmaqN\nGE/rHi9BAgMBAAECggEABZBfg/KYXeKYcvmLF8ywCKlVxyqQ0klDTf/5+LGwbHx/\nfynHXMrg+X9AoVIM99XJxWUbahXpBU1uM79+AG1xJnNj4xGRYpQ5jBDbXZIXvi56\nAJoF4RvV3vqLs9AgO2IujIATWm/FO40mXR73r7JO3wQlKDWHXu4vZu9ncxzKE3S0\nLpl5Dp5N1ylEm1eDEIt/tyEnm7D0c9SV2kgfcrjx0i1h9GWW7rG04jjRSfgNetMR\nUfGlly+KUCNJSbSLZmFBsqb5n1lAY0wDZMp/JMzgUiz0EkUzO3jmXzA8bhvuCr52\n5Y/+6HjhFCPHlI4HjPpIv2beK2TmcKsFI2rExyycVQKBgQD7DiRa5IZ9hWNWKhf5\ntkHL2kc+56k7Bl66IaQYQPE0seSBXGjOtzDZ9gEptosB9Ii4k6k1owSMWTT8jsBO\nAtBrM8kxkThYUiZnRfnlFH/K6ZNA740tOGgzEv7VdSeb4QOliS4Y/HxaMqhurLYC\n5Vwdk6iE9x4/KFySdFbP1JF6tQKBgQDE9+jW8vnMOswrXUl+zJAm51gQSRewgCQ7\ndaXD/b4ab6M8hojHyh2ZrNDe6IgZ9vwokP94xn2nTR+1T5THAwfTNTd2WLAyWD6B\nLq8cBLU7QuUOX6LE9L/bTQ9AMPr2mPNtDMNDCvoaSkzMPvdwgp9CGkY0hKdwTrKG\nmCzYEtXd3QKBgQCzlsU449q1NdL+kzP9ZHwiuC1Y+VzcpUzj9yasVuB04oBkbVdn\n8DGY6VqhnTxJFMUszCwx+0BIqZO2yuMTqv2ugif9NjXJMFLac3s0fPqBi57Tx8kE\nvSIEzyTOS3UfE9KI+t2n8A2AdFZ6fT/iSHIhkjvtidzwLw4xkdl76EJ9NQKBgQCY\nCXA98uFkhoIwetqPOKGQlgRA1dqmT9Mn3mDszwEdcMzEnGgaJ2X/yAiV91GPETmE\qp+3/ybgq8Rs9Je3ohw5KJu+Cyk+QyVEG9/ota2ap8Ec/i8q7mzlfy7lcqlVDazg\noPhb2K5C+tUa1wOyYfFCWfuU8Ew6gVSGVhJPWwKgNQKBgERkVCzkBFV4UmCYbvDZ\naGAkPoa7ALkPMUI1bJ0LBro2pe1b/wlKyYHEclVEgFJOpORE5rQHQyCMIV5pXc1Q\n/rMy1qZxW1qxjRy0Od8skjVtYbvtvkRX+cZBe2WqgOG6KGySV+8ekW2zJMUlR8QX\n7wcG8CJh2OSnrQmHJ5Ho00ot\n-----END PRIVATE KEY-----\n";

// Forzamos la conversión manual de los caracteres \n a saltos de línea reales
const fixedPrivateKey = rawPrivateKey.split("\\n").join("\n");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "techlab-menu-planner",
    clientEmail:
      "firebase-adminsdk-fbsvc@techlab-menu-planner.iam.gserviceaccount.com",
    privateKey: fixedPrivateKey,
  }),
});

const db = admin.firestore();

console.log("🔥 Firebase Admin inicializado correctamente de forma directa!");

export { db };
