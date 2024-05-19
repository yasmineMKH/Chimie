// CREATE SERVER
const express = require("express"); //importer la biblioteque express avec la foction require
const app = express();
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("./models");
const upload = require("./middleware/upload");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//const { Departement } = require('./models/Departement');

//const { Enseignant } = require('./models/Enseignant');

const cors = require("cors"); // Importer le module CORS

app.use(express.urlencoded({ extended: true }));

app.use(cors()); // Activer CORS pour toutes les routes

/*const data={
  users :[ 
    Firstname="Mekid",
    Lastname="Yasmine",
    Username="892002",
    Role="Doctorant",
    Email="meyasmine05@gamil.com",
    Password="123"
  ]
  
}

app.get('/',(req,res)=>{
  res.send(data.users)
});*/

db.sequelize.sync().then(() => {
  app.listen(3002, () => console.log("Server is running on port 3002"));
});

///////////////////////////////////////////////////////////////////fonction Registration///////////////////////////////////////////////////////////////////////////////////

// Nombre de "salts" à utiliser pour le hachage (plus le nombre est élevé, plus le hachage est sécurisé mais prend du temps)
const saltRounds = 10;

//////////////////////////////////////////foction Login///////////////////////////////////////////////////////////////////////////////////////////////

app.post("/login", async (req, res) => {
  const userData = req.body;
  try {
    // Rechercher l'utilisateur dans la base de données
    const existingUser = await db.User.findOne({
      where: {
        Username: userData.Username,
      },
    });

    if (existingUser) {
      // Comparer le mot de passe fourni avec le mot de passe haché stocké dans la base de données
      const isPasswordValid = await bcrypt.compare(
        userData.Password,
        existingUser.Password
      );

      console.log("pass:", req.params);
      if (isPasswordValid) {
        // Si le mot de passe est valide, renvoyer un message de connexion réussie
        return res.status(200).json({
          message: "Login successful",
          id: existingUser.id,
          Role: existingUser.Role,
        });
      } else {
        // Si le mot de passe n'est pas valide, renvoyer un message d'erreur
        return res.status(401).json({ message: "Invalid password" });
      }
    } else {
      // Si l'utilisateur n'existe pas, renvoyer un message d'erreur
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

////////////////////////////////////////////////////////Affichage des Users pour l'admin/////////////////////////////////////////////////////////////////////////////

// Import the User model
const { User } = require("./models");

// Express route to fetch the list of users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/////////////////////////////////DELETE UN USER////////////////////////////////////////////////////////////////////////////////////////

// Route pour supprimer un utilisateur
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    // Supprimer l'utilisateur de la base de données en utilisant le modèle User
    await User.destroy({
      where: {
        id: userId,
      },
    });
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'utilisateur" });
  }
});

////////////////////////////////////////////////////////////CONFIRMER ENSEIGNANT///////////////////////////////////////////////////////////////////////////////////////////
// Import the User model
const Enseignant = require("./models/Enseignant");
// Fonction pour confirmer un enseignant en utilisant le username
app.put("/enseignants/confirm/:Username", async (req, res) => {
  try {
    const { Username } = req.params;
    //const userData = req.body;
    console.log("Request body:", req.params);
    // Rechercher l'enseignant dans la table Enseignants en utilisant le username
    const enseignant = await db.Enseignants.findOne({
      where: {
        Username_NSS: Username,
      },
    });
    console.log("enseignant:", enseignant);
    if (!enseignant) {
      return res.status(404).json({ message: "Enseignant not found" });
    }
    // Mettre à jour la colonne "Etat_compte" dans la table "Enseignants" à true
    await enseignant.update({ Etat_compte: "true" });
    return res
      .status(200)
      .json({ message: "Enseignant confirmed successfully" });
  } catch (error) {
    console.error("Error confirming enseignant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get all users
app.get("/", (req, res) => {
  db.User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch users" });
    });
});

/////////////////////////////////////////////////////////Affichage des super_users pour l'admin/////////////////////////////////////////////////////////////////////////////

const { Super_user } = require("./models");
// Express route to fetch the list of super_user
app.get("/super_users", async (req, res) => {
  try {
    const super_users = await Super_user.findAll();
    res.json(super_users);
  } catch (error) {
    console.error("Error fetching super_users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
/////////////////////////////////DELETE UN super_user ////////////////////////////////////////////////////////////////////////////////////////

// Route pour supprimer un super_user
app.delete("/super_users/:id", async (req, res) => {
  try {
    const super_userId = req.params.id;
    // Supprimer l'super_users de la base de données en utilisant le modèle User
    await Super_user.destroy({
      where: {
        id: super_userId,
      },
    });
    res.status(200).json({ message: "super_user supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de super_user:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de super_user" });
  }
});

/////////////////////////////////////UPDATE super_user//////////////////////////////////////////////////////////////////////////////////////////////////////
// Route pour récupérer les données d'un super_user spécifique
app.get("/super_users/:id", async (req, res) => {
  const super_userId = req.params.id;

  try {
    // Rechercher le super_user dans la base de données
    const super_user = await db.Super_user.findOne({
      where: { id: super_userId },
    });

    if (!super_user) {
      return res.status(404).json({ error: "super_user not found" });
    }

    // Envoyer les données du super_user trouvé
    return res.status(200).json(super_user);
  } catch (error) {
    console.error("Error fetching super_user data:", error);
    return res.status(500).json({ error: "Failed to fetch super_user data" });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// Route pour mettre à jour les données d'un super_user/////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.put("/super_users/edit/:id", async (req, res) => {
  const super_userId = req.params.id;
  const updatedData = req.body;

  try {
    // Vérifier si le super_user existe dans la base de données
    const existingSuperUser = await db.Super_user.findByPk(super_userId);

    if (!existingSuperUser) {
      return res.status(404).json({ error: "Super user not found" });
    }

    if (updatedData.Role === "Vice doyen") {
      // Vérifier si un enseignant existe avec les nouvelles informations
      const existingTeacher = await db.Enseignants.findOne({
        where: {
          Firstname_fr: updatedData.Firstname,
          Lastname_fr: updatedData.Lastname,
          Username_NSS: updatedData.Username,
        },
      });

      if (!existingTeacher) {
        return res
          .status(400)
          .json({ error: "Super user is not an enseignant" });
      }
    } else if (
      updatedData.Role === "Secrétaire" ||
      updatedData.Role === "Admin"
    ) {
      // Vérifier si un super user existe déjà avec le même username ou email
      const existingSuperUserWithSameUsernameOrEmail =
        await db.Super_user.findOne({
          where: {
            [Op.and]: [
              { id: { [Op.not]: super_userId } }, // Exclure l'utilisateur lui-même
              {
                [Op.or]: [
                  { Username: updatedData.Username },
                  { Email: updatedData.Email },
                ],
              },
            ],
          },
        });

      if (existingSuperUserWithSameUsernameOrEmail) {
        return res
          .status(400)
          .json({ error: "Username or email already exists" });
      }
    } else {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Si un nouveau mot de passe est fourni, le hacher
    if (updatedData.Password) {
      const hashedPassword = await bcrypt.hash(updatedData.Password, 10);
      updatedData.Password = hashedPassword;
    }

    // Mettre à jour les données du super user
    await existingSuperUser.update(updatedData);

    return res.status(200).json({ message: "Super user updated successfully" });
  } catch (error) {
    console.error("Error updating super user:", error);
    return res.status(500).json({ error: "Failed to update super user" });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Route pour récupérer les données de l'user par ID//////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Rechercher l'administrateur dans la base de données par ID
    const user = await db.User.findByPk(userId);

    if (!user) {
      // Si l'administrateur n'est pas trouvé, renvoyer une réponse 404
      return res.status(404).json({ error: "Admin not found" });
    }

    // Renvoyer les données de l'administrateur au format JSON
    res.status(200).json(user);
  } catch (error) {
    // En cas d'erreur, renvoyer une réponse avec un message d'erreur
    console.error("Error fetching Admin data:", error);
    res.status(500).json({ error: "Failed to fetch Admin data" });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////LOGIN Super_User//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/loginVice", async (req, res) => {
  const userData = req.body;

  try {
    // Rechercher l'utilisateur dans la base de données
    const existingUser = await db.Super_user.findOne({
      where: {
        Username: userData.Username,
      },
    });

    if (existingUser) {
      // Comparer le mot de passe fourni avec le mot de passe haché stocké dans la base de données
      const isPasswordValid = await bcrypt.compare(
        userData.Password,
        existingUser.Password
      );

      console.log("pass:", isPasswordValid);
      if (isPasswordValid) {
        // Si le mot de passe est valide, renvoyer un message de connexion réussie
        console.log("pass:", isPasswordValid);
        return res.status(200).json({
          message: "Login successful",
          id: existingUser.id,
          Role: existingUser.Role,
        });
      } else {
        // Si le mot de passe n'est pas valide, renvoyer un message d'erreur
        return res.status(401).json({ message: "Invalid password" });
      }
    } else {
      // Si l'utilisateur n'existe pas, renvoyer un message d'erreur
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Route pour récupérer les données de l'Super_user par ID//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/super_user_info/:id", async (req, res) => {
  const Super_userId = req.params.id;

  try {
    // Rechercher l'administrateur dans la base de données par ID
    const Super_user = await db.Super_user.findByPk(Super_userId);

    if (!Super_user) {
      // Si l'administrateur n'est pas trouvé, renvoyer une réponse 404
      return res.status(404).json({ error: "Super_user not found" });
    }

    // Renvoyer les données de l'administrateur au format JSON
    res.status(200).json(Super_user);
  } catch (error) {
    // En cas d'erreur, renvoyer une réponse avec un message d'erreur
    console.error("Error fetching Super_user data:", error);
    res.status(500).json({ error: "Failed to fetch Super_user data" });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////ADD SUPER_USER///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Route pour ajouter un nouveau super_user
app.post("/super_user/add", async (req, res) => {
  const userData = req.body;
  console.log("Request body:", req.body);

  try {
    if (userData.Role === "Vice doyen") {
      // Vérifier si l'utilisateur existe déjà dans la table "enseignant"
      const existingTeacher = await db.Enseignants.findOne({
        where: {
          Username_NSS: userData.Username,
          Lastname_fr: userData.Lastname,
          Firstname_fr: userData.Firstname,
        },
      });

      console.log("existingTeacher:", existingTeacher);
      if (!existingTeacher) {
        // Si l'utilisateur n'existe pas dans la table "enseignant", renvoyer un message d'erreur
        return res
          .status(400)
          .json({ error: "Vice dean does not exist in the teacher table" });
      }

      // Vérifier si le nom d'utilisateur ou l'e-mail existe déjà dans la table "Super_user"
      const existingUser = await db.Super_user.findOne({
        where: {
          [Op.or]: [{ Username: userData.Username }, { Email: userData.Email }],
        },
      });

      console.log("existingUser:", existingUser);
      if (existingUser) {
        // Si l'utilisateur existe déjà dans la table "Super_user", renvoyer un message d'erreur
        return res.status(400).json({ error: "User already exists" });
      }
    } else if (userData.Role === "Secrétaire" || userData.Role === "Admin") {
      // Vérifier si le nom d'utilisateur ou l'e-mail existe déjà dans la table "Super_user"
      const existingSuperUser = await db.Super_user.findOne({
        where: {
          [Op.or]: [{ Username: userData.Username }, { Email: userData.Email }],
        },
      });

      if (existingSuperUser) {
        // Si l'utilisateur existe déjà dans la table "Super_user", renvoyer un message d'erreur
        return res.status(400).json({ error: "User already exists" });
      }
    } else {
      // Si le rôle n'est pas valide, renvoyer un message d'erreur
      return res.status(400).json({ error: "Invalid role" });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(userData.Password, saltRounds);

    // Remplacer le mot de passe non haché par le hachage
    userData.Password = hashedPassword;

    // Créer un nouvel utilisateur avec le mot de passe haché
    const newUser = await db.Super_user.create(userData);

    // Envoyer une réponse avec le nouvel utilisateur créé
    return res
      .status(200)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    // En cas d'erreur, renvoyer une réponse avec un message d'erreur approprié
    console.error("Error adding user:", error);
    return res.status(500).json({ error: "Failed to add user" });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////Registration//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/Registration", async (req, res) => {
  const userData = req.body;
  console.log("Request body:", req.body);

  try {
    // Vérifier si l'utilisateur existe déjà dans la base de données
    let existingUser = await db.User.findOne({
      where: {
        [Op.or]: [{ Username: userData.Username }, { Email: userData.Email }],
      },
    });
    console.log("existingUser:", existingUser);
    if (existingUser) {
      // Si l'utilisateur existe déjà, renvoyer un message d'erreur
      return res.status(400).json({ error: "User already exists" });
    } else {
      // Si le rôle de l'utilisateur est "Enseignant"
      if (userData.Role === "Enseignant") {
        // Chercher dans la table des enseignants
        let enseignant = await db.Enseignants.findOne({
          where: {
            Username_NSS: userData.Username,
          },
        });
        console.log("enseignant:", enseignant);
        if (enseignant) {
          // Hasher le mot de passe
          const hashedPassword = await bcrypt.hash(userData.Password, 10);
          // Ajouter l'utilisateur à la table des utilisateurs avec le rôle "Enseignant"
          let newUser = await db.User.create({
            ...userData,
            Password: hashedPassword,
          });

          // Mettre à jour l'état du compte dans la table des enseignants
          await enseignant.update({ Etat_compte: true });

          return res.status(201).json(newUser);
        } else {
          // Si l'utilisateur n'est pas trouvé dans la table des enseignants, chercher dans la table des doctorants
          let doctorant = await db.Doctorant.findOne({
            where: {
              Username_Mat: userData.Username,
            },
          });
          console.log("doctorant:", doctorant);
          if (doctorant) {
            // Hasher le mot de passe
            const hashedPassword = await bcrypt.hash(userData.Password, 10);
            // Ajouter l'utilisateur à la table des utilisateurs avec le rôle "Doctorant"
            let newUser = await db.User.create({
              ...userData,
              Role: "Doctorant",
              Password: hashedPassword,
            });

            // Mettre à jour l'état du compte dans la table des doctorants
            await doctorant.update({ Etat_compte: true });

            return res.status(201).json(newUser);
          } else {
            // Si l'utilisateur n'est pas trouvé ni dans la table des enseignants ni dans la table des doctorants, renvoyer une erreur
            return res.status(400).json({
              error: "Username not found in Enseignant et Doctorant table",
            });
          }
        }
      } else if (userData.Role === "Doctorant") {
        // Si le rôle de l'utilisateur est "Doctorant"
        // Chercher dans la table des doctorants
        let doctorant = await db.Doctorant.findOne({
          where: {
            Username_Mat: userData.Username,
          },
        });
        console.log("doctorant:", doctorant);
        if (doctorant) {
          // Hasher le mot de passe
          const hashedPassword = await bcrypt.hash(userData.Password, 10);
          // Ajouter l'utilisateur à la table des utilisateurs avec le rôle "Doctorant"
          let newUser = await db.User.create({
            ...userData,
            Password: hashedPassword,
          });

          // Mettre à jour l'état du compte dans la table des doctorants
          await doctorant.update({ Etat_compte: true });

          return res.status(201).json(newUser);
        } else {
          // Si l'utilisateur n'est pas trouvé dans la table des doctorants, chercher dans la table des enseignants
          let enseignant = await db.Enseignants.findOne({
            where: {
              Username_NSS: userData.Username,
            },
          });

          if (enseignant) {
            // Hasher le mot de passe
            const hashedPassword = await bcrypt.hash(userData.Password, 10);
            // Ajouter l'utilisateur à la table des utilisateurs avec le rôle "Enseignant"
            let newUser = await db.User.create({
              ...userData,
              Role: "Enseignant",
              Password: hashedPassword,
            });

            // Mettre à jour l'état du compte dans la table des enseignants
            await enseignant.update({ Etat_compte: true });

            return res.status(201).json(newUser);
          } else {
            // Si l'utilisateur n'est pas trouvé ni dans la table des doctorants ni dans la table des enseignants, renvoyer une erreur
            return res.status(400).json({
              error: "Username not found in Doctorant or Enseignant table",
            });
          }
        }
      } else {
        // Si le rôle n'est ni "Enseignant" ni "Doctorant", renvoyer une erreur
        return res.status(400).json({ error: "Invalid role" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to register user" });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*app.post('/Registration', async (req, res) => {
    const userData = req.body;
    console.log('Request body:', req.body);
    
    try {
        // Vérifier si l'utilisateur existe déjà dans la base de données
        let existingUser = await db.User.findOne({ 
            where: { 
                [Op.or]: [
                    { Username: userData.Username },
                    { Email: userData.Email }
                ]
            } 
        });
        
        if (existingUser) {
            // Si l'utilisateur existe déjà, renvoyer un message d'erreur
            return res.status(400).json({ error: 'User already exists' });
        } else {
            // Si le rôle de l'utilisateur est "Enseignant"
            if (userData.Role === "Enseignant") {
                // Chercher dans la table des enseignants
                let enseignant = await db.Enseignants.findOne({
                    where: {
                        Username_NSS: userData.Username
                    }
                });
                
                if (enseignant) {
                    // Hasher le mot de passe
                    const hashedPassword = await bcrypt.hash(userData.Password, 10);
                    // Ajouter l'utilisateur à la table des utilisateurs avec le rôle "Enseignant" et le mot de passe hashé
                    let newUser = await db.User.create({
                        ...userData,
                        Password: hashedPassword
                    });
                    
                    // Mettre à jour l'état du compte dans la table des enseignants
                    await enseignant.update({ Etat_compte: true });
                    
                    return res.status(201).json(newUser);
                } else {
                    // Si l'utilisateur n'est pas trouvé dans la table des enseignants, renvoyer une erreur
                    return res.status(400).json({ error: 'Username not found in Enseignant table' });
                }
            } else if (userData.Role === "Doctorant") {
                // Si le rôle de l'utilisateur est "Doctorant"
                // Chercher dans la table des doctorants
                let doctorant = await db.Doctorant.findOne({
                    where: {
                        Username_Mat: userData.Username
                    }
                });
                
                if (doctorant) {
                    // Hasher le mot de passe
                    const hashedPassword = await bcrypt.hash(userData.Password, 10);
                    // Ajouter l'utilisateur à la table des utilisateurs avec le rôle "Doctorant" et le mot de passe hashé
                    let newUser = await db.User.create({
                        ...userData,
                        Password: hashedPassword
                    });
                    
                    // Mettre à jour l'état du compte dans la table des doctorants
                    await doctorant.update({ Etat_compte: true });
                    
                    return res.status(201).json(newUser);
                } else {
                    // Si l'utilisateur n'est pas trouvé dans la table des doctorants, renvoyer une erreur
                    return res.status(400).json({ error: 'Username not found in Doctorant table' });
                }
            } else {
                // Si le rôle n'est ni "Enseignant" ni "Doctorant", renvoyer une erreur
                return res.status(400).json({ error: 'Invalid role' });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to register user' });
    }
});
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////récupérer les données d'un enseignant//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Route pour récupérer les données d'un enseignant spécifique
const { Enseignants } = require("./models");
// Express route to fetch the list of enseignants
app.get("/enseignants", async (req, res) => {
  try {
    const enseignants = await Enseignants.findAll();
    res.json(enseignants);
  } catch (error) {
    console.error("Error fetching enseignants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////Ajouter et  DELETE UN Membre_Commission ////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { Membre_Commission } = require("./models");

// Ajoutez ces routes à votre fichier de routes backend :

// Route pour ajouter un enseignant à la commission
app.post("/membre_commission", async (req, res) => {
  const { Username_NSS } = req.body;
  try {
    // Vérifier si l'enseignant existe déjà dans la commission
    const existingMember = await db.Membre_Commission.findOne({
      where: { Username_NSS },
    });
    if (existingMember) {
      return res
        .status(400)
        .json({ error: "Enseignant already exists in commission" });
    }
    // Ajouter l'enseignant à la commission
    await db.Membre_Commission.create({ Username_NSS });
    return res
      .status(201)
      .json({ message: "Enseignant added to commission successfully" });
  } catch (error) {
    console.error("Error adding enseignant to commission:", error);
    return res
      .status(500)
      .json({ error: "Failed to add enseignant to commission" });
  }
});

// Route pour supprimer un enseignant de la commission
app.delete("/membre_commission/:Username_NSS", async (req, res) => {
  const { Username_NSS } = req.params;
  try {
    // Supprimer l'enseignant de la commission
    await db.Membre_Commission.destroy({
      where: { Username_NSS },
    });
    return res
      .status(200)
      .json({ message: "Enseignant removed from commission successfully" });
  } catch (error) {
    console.error("Error removing enseignant from commission:", error);
    return res
      .status(500)
      .json({ error: "Failed to remove enseignant from commission" });
  }
});
//////////////////////////////////////////////////////////GET Donnéé MEMBRE/////////////////////////////////////////////////////////////////////////////////////////////

// Définissez la route pour récupérer les données de la commission
/*app.get('/membre_commission/info', async (req, res) => {
    try {
        // Récupérer les données des membres de la commission depuis la base de données
        const membresCommission = await Membre_Commission.findAll();
        // Extraire uniquement les noms d'utilisateur des membres de la commission
        const commission = membresCommission.map(membre => membre.Username_NSS);
        // Retourner les noms d'utilisateur des membres de la commission sous forme de réponse JSON
        res.json(commission);
    } catch (error) {
        console.error('Failed to fetch commission data:', error);
        // Retourner une erreur 500 en cas d'échec
        res.status(500).json({ error: 'Failed to fetch commission data' });
    }
});*/

// Définissez la route pour récupérer les données de la commission avec les informations sur les membres et les présidents
app.get("/membre_commission/info", async (req, res) => {
  try {
    // Récupérer les données des membres de la commission depuis la base de données
    const membresCommission = await Membre_Commission.findAll({
      where: { Président: "false" },
    });

    const membresPresident = await Membre_Commission.findAll({
      where: { Président: "true" },
    });

    // Retourner les noms d'utilisateur des membres non présidents sous forme de tableau JSON
    const commission = membresCommission.map((membre) => membre.Username_NSS);
    // Retourner les noms d'utilisateur des présidents sous forme de tableau JSON
    const president = membresPresident.map(
      (president) => president.Username_NSS
    );
    // Retourner les noms d'utilisateur des membres non présidents et des présidents sous forme de réponse JSON
    res.json({ commission, president });
  } catch (error) {
    console.error("Failed to fetch commission data:", error);
    // Retourner une erreur 500 en cas d'échec
    res.status(500).json({ error: "Failed to fetch commission data" });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////Ajouter Président de la commission//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Route pour ajouter un enseignant à la commission
app.post("/membre_commission/president/add", async (req, res) => {
  const { Username_NSS } = req.body;
  try {
    // Vérifier si l'enseignant existe déjà dans la commission
    const existingMember = await db.Membre_Commission.findOne({
      where: { Username_NSS },
    });
    if (existingMember) {
      return res
        .status(400)
        .json({ error: "Enseignant already exists in commission" });
    }
    // Ajouter l'enseignant à la commission
    await db.Membre_Commission.create({ Username_NSS, Président: true });
    return res
      .status(201)
      .json({ message: "Enseignant added to commission successfully" });
  } catch (error) {
    console.error("Error adding enseignant to commission:", error);
    return res
      .status(500)
      .json({ error: "Failed to add enseignant to commission" });
  }
});

// Route pour supprimer un enseignant de la commission
app.delete(
  "/membre_commission/:Username_NSS/president/delete",
  async (req, res) => {
    const { Username_NSS } = req.params;
    try {
      // Supprimer l'enseignant de la commission
      await db.Membre_Commission.destroy({
        where: { Username_NSS },
      });
      return res
        .status(200)
        .json({ message: "Enseignant removed from commission successfully" });
    } catch (error) {
      console.error("Error removing enseignant from commission:", error);
      return res
        .status(500)
        .json({ error: "Failed to remove enseignant from commission" });
    }
  }
);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////Delete all commission///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Route pour supprimer tous les membres de la commission
app.delete("/membre_commission/all", async (req, res) => {
  try {
    // Supprimer tous les membres de la commission
    await db.Membre_Commission.destroy({
      where: {}, // Aucune condition spécifique nécessaire pour supprimer tous les enregistrements
      truncate: true, // Truncate permet de supprimer tous les enregistrements sans condition
    });
    return res
      .status(200)
      .json({ message: "All members removed from commission successfully" });
  } catch (error) {
    console.error("Error removing all members from commission:", error);
    return res
      .status(500)
      .json({ error: "Failed to remove all members from commission" });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////demande SPE////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { SPE_doc } = require("./models");
app.post("/:Username/demande_SPE", async (req, res) => {
  // Récupérer les données du corps de la requête
  const {
    Pays,
    Ville,
    Etablissement_acc,
    Periode_Stage,
    Date_dep,
    Date_retour,
  } = req.body;

  const { Username } = req.params;
  console.log("Request body:", req.body);
  try {
    // Vérifier si la demande existe déjà dans la table SPE
    const existingDemande = await db.SPE_doc.findOne({
      where: { Username_Mat:Username },
    });
    if (existingDemande) {
      return res
        .status(400)
        .json({ error: "Demande already exists in SPE table" });
    }

    // Ajouter la demande dans la table SPE
    await db.SPE_doc.create({
      Username_Mat:Username,
      Pays,
      Ville,
      Etablissement_acc,
      Periode_Stage,
      Date_dep,
      Date_retour,
    });

// Mettre à jour la base de données pour confirmer la participation
await db.Doctorant.update(
  { Est_participe: "true" },
  { where: { Username_Mat:Username } }
);
    return res
      .status(201)
      .json({ message: "Demande ajoutée avec succès dans la table SPE" });
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout de la demande dans la table SPE :",
      error
    );
    return res
      .status(500)
      .json({ error: "Échec de l'ajout de la demande dans la table SPE" });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////check Décision SPE///////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/doctorants/:username/decision', async (req, res) => {
  const { username } = req.params;
  try {
    const docSpe = await SPE_doc.findOne({ where: { Username_Mat: username } });

    if (!docSpe) {
      return res.status(404).send({ message: "No record found for the given username" });
    }

    const decisionMessage = SPE_doc.Decision === "true" ? "Accepté" : "Pas encore accepté";
    res.status(200).send({ message: decisionMessage });
  } catch (error) {
    console.error('Error checking decision:', error);
    res.status(500).send({ error: "Failed to check decision" });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////Annuler demande SPE//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.put("/doctorants/:username/cancel", async (req, res) => {
  const { username } = req.params;
  console.log("Request body:", req.params);
  try {
    // Mettre à jour la base de données pour annuler la participation
    await db.Doctorant.update(
      { Est_participe: "false" },
      { where: { Username_Mat: username } }
    );

    // Supprimer la ligne correspondante dans la table SPE_doc
    await SPE_doc.destroy({ where: { Username_Mat: username } });

    res.status(200).send({ message: "Participation canceled successfully" });
  } catch (error) {
    console.error("Error canceling participation:", error);
    res.status(500).send({ error: "Failed to cancel participation" });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////Recours//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { Recours } = require("./models");

app.post('/:Username/recours_SPE', async (req, res) => {
  const { Username } = req.params;
  const { Commentaire } = req.body;

  const existingRecours = await Recours.findOne({
    where: {
      Username_Mat: Username,
      TypeDemande: "Stage de perfectionnement à l’étranger",
    },
  });

  if (existingRecours) {
    return res.status(400).json({ error: "Un recours existe déjà pour ce type de demande et cet utilisateur." });
  }
  try {
    // Ajouter la demande dans la table Recours
    await Recours.create({
      Username_Mat:Username,
      Commentaire,
      TypeDemande: "Stage de perfectionnement à l’étranger", // Ajouter TypeDemande directement ici
    });

    return res.status(201).json({ message: "Recours ajouté avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'ajout du recours SPE :", error);
    return res.status(500).json({ error: "Échec de l'ajout du recours SPE" });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// vérifier ouverture session Recours//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/session/recours/is_open', async (req, res) => {
  

  try {
    // Recherche de la session correspondant à l'utilisateur spécifié
    const session = await Session.findOne({
      where: {
        Nom_S: "Recours", // Nom de la session à vérifier
      },
    });

    // Vérifier si la session existe et si elle est ouverte
    const isSessionOpen = session.Est_ouverte === "true" ? true : false;

    return res.status(200).json({ is_open: isSessionOpen });
  } catch (error) {
    console.error("Erreur lors de la vérification de la session :", error);
    return res.status(500).json({ error: "Échec de la vérification de la session" });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////Vérifier ouverture sesion SPE//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/session/is_open_stage_perfectionnement', async (req, res) => {
  

  try {
    // Recherche de la session correspondant à l'utilisateur spécifié
    const session = await Session.findOne({
      where: {
        Nom_S: "Stage de perfectionnement à l’étrangé", // Nom de la session à vérifier
      },
    });

    // Vérifier si la session existe et si elle est ouverte
    const isSessionOpen = session.Est_ouverte === "true" ? true : false;

    return res.status(200).json({ is_open: isSessionOpen });
  } catch (error) {
    console.error("Erreur lors de la vérification de la session :", error);
    return res.status(500).json({ error: "Échec de la vérification de la session" });
  }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { Binome_Comission } = require("./models");
app.post("/binome_comission/create", async (req, res) => {
  try {
    // Récupérer les enseignants de la commission
    const enseignants = await db.Membre_Commission.findAll({
      where: { Président: "false" },
    });

    // Déterminer la moitié de la longueur des enseignants arrondie à l'entier supérieur
    const halfLength = Math.ceil(enseignants.length / 2);

    // Compteur pour suivre le nombre d'enseignants traités
    let enseignantsTraites = 0;

    // Créer les binômes à partir des enseignants
    for (let i = 0; i < enseignants.length; i += 2) {
      // Déterminer le type de traitement en fonction du nombre d'enseignants déjà traités
      const typeTraitement =
        enseignantsTraites < halfLength
          ? "traitement_enseignant"
          : "traitement_doctorant";

      // Créer le binôme avec le type de traitement approprié
      const binome1 = await db.Binome_Comission.create({
        Username_Nss1: enseignants[i].Username_NSS,
        Username_Nss2: enseignants[i + 1].Username_NSS,
        Type_traitement: typeTraitement,
      });

      // Incrémenter le compteur des enseignants traités
      enseignantsTraites += 2;
    }

    // Envoyer une réponse de succès
    return res.status(201).json({ message: "Binômes créés avec succès" });
  } catch (error) {
    // Gérer les erreurs
    console.error(
      "Erreur lors de la création des binômes de commission:",
      error
    );
    return res
      .status(500)
      .json({ error: "Échec de la création des binômes de commission" });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////Affichage BINOME///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/binome_comission", async (req, res) => {
  try {
    // Récupérer les binômes depuis la base de données
    const binomes = await db.Binome_Comission.findAll();

    // Créer un tableau pour stocker les binômes avec les informations des enseignants
    const binomesAvecEnseignants = [];

    // Parcourir chaque binôme pour charger les informations des enseignants associés
    for (const binome of binomes) {
      // Charger les informations de l'enseignant 1 associé au binôme
      const enseignant1 = await db.Enseignants.findOne({
        where: { Username_NSS: binome.Username_Nss1 },
      });

      // Charger les informations de l'enseignant 2 associé au binôme
      const enseignant2 = await db.Enseignants.findOne({
        where: { Username_NSS: binome.Username_Nss2 },
      });

      // Ajouter le binôme avec les informations des enseignants dans le tableau
      binomesAvecEnseignants.push({
        id: binome.id,
        Username_Nss1: binome.Username_Nss1,
        Username_Nss2: binome.Username_Nss2,
        Type_traitement: binome.Type_traitement,
        Enseignant1: enseignant1,
        Enseignant2: enseignant2,
      });
    }

    // Retourner les binômes avec les informations des enseignants sous forme de réponse JSON
    res.json(binomesAvecEnseignants);
  } catch (error) {
    console.error("Failed to fetch binomes:", error);
    // Retourner une erreur 500 en cas d'échec
    res.status(500).json({ error: "Failed to fetch binomes" });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////vérifier l'appartenance de user à la commission///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Endpoint pour vérifier l'appartenance à la commission
app.get("/check_commission_membership/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // Vérifier si l'utilisateur est membre de la commission
    const isMember = await db.Membre_Commission.findOne({
      where: {
        Username_NSS: username,
      },
    });

    // Retourner la réponse
    res.json({ isMember: !!isMember });
  } catch (error) {
    console.error("Failed to check commission membership:", error);
    res.status(500).json({ error: "Failed to check commission membership" });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Endpoint pour récupérer les informations de l'enseignant
app.get("/enseignant/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // Requête pour récupérer les informations de l'utilisateur
    const user = await db.Enseignants.findOne({
      where: {
        Username_NSS: username,
      },
    });

    // Retourner les informations de l'utilisateur
    res.json(user);
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////Session////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { Session } = require("./models");

// Endpoint pour mettre à jour l'attribut est_ouvert d'une session
app.get("/sessions/:sessionId", async (req, res) => {
  const { sessionId } = req.params;

  try {
    // Recherche de la session par son ID dans la base de données
    const session = await Session.findByPk(sessionId);

    if (!session) {
      // Si la session n'est pas trouvée, retourner une erreur 404
      return res.status(404).json({ error: "Session not found" });
    }

    // Retourner la session mise à jour en réponse
    res.json(session);
  } catch (error) {
    console.error("Error updating session:", error);
    // Retourner une erreur 500 en cas d'erreur serveur
    res.status(500).json({ error: "Failed to update session" });
  }
});

app.put("/sessions/:sessionId/open", async (req, res) => {
  const { sessionId } = req.params;

  try {
    // Trouver la session par son ID
    const session = await Session.findByPk(sessionId);

    if (!session) {
      // Si la session n'est pas trouvée, retourner une erreur 404
      return res.status(404).json({ error: "Session not found" });
    }

    // Mettre à jour l'attribut est_ouvert de la session à true
    session.Est_ouverte = true;
    await session.save();

    // Retourner la session mise à jour
    res.json(session);
  } catch (error) {
    console.error("Error opening session:", error);
    // Retourner une erreur 500 en cas d'erreur serveur
    res.status(500).json({ error: "Failed to open session" });
  }
});

// Route pour fermer une session
app.put("/sessions/:sessionId/close", async (req, res) => {
  const { sessionId } = req.params;

  try {
    // Trouver la session par son ID
    const session = await Session.findByPk(sessionId);

    if (!session) {
      // Si la session n'est pas trouvée, retourner une erreur 404
      return res.status(404).json({ error: "Session not found" });
    }

    // Mettre à jour l'attribut est_ouvert de la session à false
    session.Est_ouverte = "false";
    await session.save();

    // Retourner la session mise à jour
    res.json(session);
  } catch (error) {
    console.error("Error closing session:", error);
    // Retourner une erreur 500 en cas d'erreur serveur
    res.status(500).json({ error: "Failed to close session" });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////Saisir Budget//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { Annee } = require("./models");

// Route to create a new Annee entry with the given global budget
app.post("/annee", async (req, res) => {
  const { budgetGlobal } = req.body;

  try {
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Calculate budgets for enseignement and recherche
    const pourcentageEns = 0.5;
    const pourcentageDoc = 0.4;
    const budgetEns = budgetGlobal * pourcentageEns;
    const budgetDoc = budgetGlobal * pourcentageDoc;

    // Create a new Annee entry with the current year and calculated budgets
    const annee = await Annee.create({
      Annee: currentYear,
      Budget_global: budgetGlobal,
      Budget_ens: budgetEns,
      Budget_doc: budgetDoc,
    });

    res.status(201).json(annee);
  } catch (error) {
    console.error("Error creating Annee:", error);
    res.status(500).json({ error: "Failed to create Annee" });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////Participation/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.put("/doctorants/:username/confirm", async (req, res) => {
  const { username } = req.params;
  console.log("Request body:", req.params);
  try {
    // Vérifier si le nom d'utilisateur est unique dans la table SPE_doc
    const existingSPEdoc = await SPE_doc.findOne({
      where: { Username_Mat: username },
    });
    if (existingSPEdoc) {
      return res
        .status(400)
        .send({ error: "Username already exists in SPE_doc table" });
    }

    // Mettre à jour la base de données pour confirmer la participation
    await db.Doctorant.update(
      { Est_participe: "true" },
      { where: { Username_Mat: username } }
    );

    // Ajouter le nom d'utilisateur à la table SPE_doc
    await SPE_doc.create({ Username_Mat: username });

    res.status(200).send({ message: "Participation confirmed successfully" });
  } catch (error) {
    console.error("Error confirming participation:", error);
    res.status(500).send({ error: "Failed to confirm participation" });
  }
});



app.get("/doctorants/:username/status", async (req, res) => {
  const { username } = req.params;
  console.log("Request body:", req.params);
  try {
    // Recherche du doctorant dans la base de données
    const doctorant = await db.Doctorant.findOne({
      where: { Username_Mat: username },
    });
    if (!doctorant) {
      return res.status(404).send({ error: "Doctorant not found" });
    }

    // Renvoyer l'état de participation du doctorant
    res.json(doctorant);
  } catch (error) {
    console.error("Error fetching participation status:", error);
    res.status(500).send({ error: "Failed to fetch participation status" });
  }
});

//////////////////////////////////upload///////////////////////////////////////////////////////////

const multer = require("multer");

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploadfile/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Set up a route for file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  // Handle the uploaded file
  res.json({ message: "File uploaded successfully!" });
});

//////////////////affihcage des fichiers /////////////
app.get("/uploadfile", (req, res) => {
  const directoryPath = path.join(__dirname, "uploadfile");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan files");
    }
    res.json(files);
  });
});
/////////////////////////////add teahcer/////////////////////////////////////////////////////////////////////
app.post('/addteacher', async (req, res) => {
  const {
    Username_NSS,
    Firstname_fr,
    Lastname_fr,
    Firstname_ab,
    Lastname_ab,
    Date_naissance,
    Lieu_naissance,
    Numero_telephone,
    Sexe,
    Grade,
    Specialite,
    Laboratoire,
    Departement,
    Email,
    Usthb,
    Situation
  } = req.body;

  try {
    // Vérifiez si l'enseignant existe déjà
    const existingTeacher = await Enseignants.findOne({
      where: { Username_NSS }
    });

    if (existingTeacher) {
      return res.status(400).json({ error: 'Username_NSS already exists' });
    }

    // Créez un nouvel enseignant
    const newTeacher = await Enseignants.create({
      Username_NSS,
      Firstname_fr,
      Lastname_fr,
      Firstname_ab,
      Lastname_ab,
      Date_naissance,
      Lieu_naissance,
      Numero_telephone,
      Sexe,
      Grade,
      Specialite,
      Laboratoire,
      Departement,
      Email,
      Usthb,
      Situation
    });

    res.status(201).json(newTeacher);
  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/////////////////////////////////////////////////update Teacher//////////////////////////////////////////////
app.put("/updateacher/:id", async (req, res) => {
  const id = req.params.id; // Accédez à l'ID correctement
  const updatedData = req.body;
  console.log("Request body:", req.params);
  try {
    // Find the teacher by ID
    const teacher = await db.Enseignants.findOne({
      where: { id: id }, // Utilisez l'ID correctement
    });

    // Si l'enseignant avec l'ID donné n'est pas trouvé, retournez 404
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Mettre à jour les informations de l'enseignant
    await teacher.update(updatedData);

    // Envoyer l'enseignant mis à jour dans la réponse
    res.status(200).json(teacher);
  } catch (error) {
    console.error("Error updating teacher:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/////////////////////////////////////////////////delete Teahcer///////////////////////////////////////////////

app.delete("/deleteteacher/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Request body:", req.params);
  try {
    // Find the teacher by ID
    const teacher = await Enseignants.findByPk(id);

    // If teacher with given ID is not found, return 404
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Delete the teacher

    await db.Enseignants.destroy({
      where: { id: id },
    });

    // Send success message
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/////////////////////////////add doctorant/////////////////////////////////////////////////////////////////////
const { Doctorant } = require("./models");
app.post('/adddoctorant', async (req, res) => {
  const {
    Username_Mat,
    Titre,
    Nom_fr,
    Prenoms_fr,
    Nom_ab,
    Prenoms_ab,
    Date_naiss,
    Lieu_naiss,
    Nationalit,
    Statut,
    Type_inscri,
    Filiere,
    Domaine,
    Option,
    Sexe,
    Adresse,
    Mail,
    Org_employ,
    Dip_acces,
    Dat_obten,
    Lieu_obten,
    An_univer,
    Gel,
    Sujet,
    Dir_these,
    Grade_dir,
    Lieu_exer,
    Code_dir,
    Grade_codir,
    L_exer,
    Cdir_these,
    Labo,
    D_labo,
    Numero_telephone,
    Grade,
    Laboratoire,
    Departement,
    Usthb,
    President,
    Promoteur
  } = req.body;

  try {
    // Vérifiez si l'enseignant existe déjà
    const existingTeacher = await Doctorant.findOne({
      where: { Username_Mat }
    });

    if (existingTeacher) {
      return res.status(400).json({ error: 'Username_NSS already exists' });
    }

    // Créez un nouvel enseignant
    const newTeacher = await Doctorant.create({
      Username_Mat,
    Titre,
    Nom_fr,
    Prenoms_fr,
    Nom_ab,
    Prenoms_ab,
    Date_naiss,
    Lieu_naiss,
    Nationalit,
    Statut,
    Type_inscri,
    Filiere,
    Domaine,
    Option,
    Sexe,
    Adresse,
    Mail,
    Org_employ,
    Dip_acces,
    Dat_obten,
    Lieu_obten,
    An_univer,
    Gel,
    Sujet,
    Dir_these,
    Grade_dir,
    Lieu_exer,
    Code_dir,
    Grade_codir,
    L_exer,
    Cdir_these,
    Labo,
    D_labo,
    Numero_telephone,
    Grade,
    Laboratoire,
    Departement,
    Usthb,
    President,
    Promoteur
    });

    res.status(201).json(newTeacher);
  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/////////////////////////////////////////////////update doctorant//////////////////////////////////////////////
app.put("/updatdoctorant/:id", async (req, res) => {
  const id = req.params.id; // Accédez à l'ID correctement
  const updatedData = req.body;
  console.log("Request body:", req.params);
  try {
    // Find the teacher by ID
    const doctorant = await db.Doctorant.findOne({
      where: { id: id }, // Utilisez l'ID correctement
    });

    // Si l'enseignant avec l'ID donné n'est pas trouvé, retournez 404
    if (!doctorant) {
      return res.status(404).json({ error: "doctorant not found" });
    }

    // Mettre à jour les informations de l'enseignant
    await doctorant.update(updatedData);

    // Envoyer l'enseignant mis à jour dans la réponse
    res.status(200).json(doctorant);
  } catch (error) {
    console.error("Error updating doctorant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/////////////////////////////////////////////////delete doctorant///////////////////////////////////////////////

app.delete("/deletedoctorant/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Request body:", req.params);
  try {
    // Find the teacher by ID
    const doctorants = await Doctorant.findByPk(id);

    // If teacher with given ID is not found, return 404
    if (!doctorants) {
      return res.status(404).json({ error: "doctorants not found" });
    }

    // Delete the teacher

    await db.Doctorant.destroy({
      where: { id: id },
    });

    // Send success message
    res.status(200).json({ message: "doctorant deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctorant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////GET Doctorant////////////////////////////////////////////////////////////////////////////////////
app.get("/doctorants", async (req, res) => {
  try {
    const doctorants = await Doctorant.findAll();
    res.json(doctorants);
  } catch (error) {
    console.error("Error fetching doctorants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////// Get all SPE_doc/////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/SPE/:Username', async (req, res) => {
  const { Username } = req.params;
  try {
    // Find the binome id associated with the given Username
    const binome = await Binome_Comission.findOne({
      where: {
        [Op.or]: [
          { Username_NSS1: Username },
          { Username_NSS2: Username }
        ]
      }
    });

    if (!binome) {
      return res.status(404).json({ message: "Binome not found for the given Username" });
    }

    // Fetch all SPE_doc records with the found id_Binome
    const doctorants = await SPE_doc.findAll({
      where: {
        id_Binome: binome.id
      }
    });

    res.json(doctorants);
  } catch (error) {
    console.error('Error fetching SPE_doc data:', error);
    res.status(500).send('Internal Server Error');
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////Saisire la note plus l'affectation à un troisieme membre//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*app.put('/updatSPE/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const result = await SPE_doc.update(updatedData, { where: { id } });
    if (result[0] > 0) {
      res.sendStatus(200);
    } else {
      res.status(404).send('Doctorant not found');
    }
  } catch (error) {
    console.error('Error updating SPE_doc:', error);
    res.status(500).send('Internal Server Error');
  }
});*/

app.put('/SPE/update/:id', async (req, res) => {
  const { id } = req.params;
  const { note } = req.body;

  try {
    const speDoc = await SPE_doc.findByPk(id);
    if (!speDoc) {
      return res.status(404).json({ message: "SPE_doc not found" });
    }

    if (speDoc.Note1 === null) {
      speDoc.Note1 = note;
    } else if (speDoc.Note2 === null) {
      speDoc.Note2 = note;
      const diff = Math.abs(speDoc.Note1 - speDoc.Note2);
      // If both notes are assigned, calculate the final note
    

      if (diff === 0) {
        speDoc.Note_finale = speDoc.Note1; // or Note2 since they are equal
      } else {
        // Fetch the binome associated with this SPE_doc
        const binome = await Binome_Comission.findByPk(speDoc.id_Binome);

        console.log("binome:", binome);
        if (binome) {
          try {
            // Exécuter une requête SQL JOIN pour exclure les membres du binôme de la liste des membres potentiels
            const potentialMembers = await Membre_Commission.findAll({
              where: {
                Username_NSS: {
                  [Op.notIn]: [binome.Username_NSS1, binome.Username_NSS2, speDoc.Username_Mat]
                }
              }
            });
            
            // Sélectionner un membre qui répond aux critères
            if (potentialMembers.length > 0) {
              const selectedMember = potentialMembers[0];
              speDoc.Username_NSS3 = selectedMember.Username_NSS;
            }
          } catch (error) {
            console.error("Error fetching potential members:", error);
          }
      }}}
      else {
      speDoc.Note_finale = note;
      await speDoc.save();
      return res.status(200).json(speDoc);
    }

    /*if (speDoc.Note1 !== null && speDoc.Note2 !== null) {
      const diff = Math.abs(speDoc.Note1 - speDoc.Note2);
      if (diff === 0) {
        speDoc.Note_finale = speDoc.Note1; // Or Note2 since they are equal
      } else {
        // Fetch all members excluding the ones already in the document
        const binome = await Binome_Commission.findByPk(speDoc.id_Binome);
        let potentialMembers = await Membre_Commission.findAll({
          where: {
            Username_NSS: { [Op.ne]: speDoc.Username_Mat }
          }
        });

        if (binome) {
          potentialMembers = potentialMembers.filter(member =>
            member.Username_NSS !== binome.Username_NSS1 &&
            member.Username_NSS !== binome.Username_NSS2
          );
        }

        // Pick a member who satisfies the condition
        const selectedMember = potentialMembers[Math.floor(Math.random() * potentialMembers.length)];
        speDoc.Username_NSS3 = selectedMember.Username_NSS;
      }
    }*/

    await speDoc.save();
    res.status(200).json(speDoc);
  } catch (error) {
    console.error('Error updating SPE_doc:', error);
    res.status(500).send('Internal Server Error');
  }
});