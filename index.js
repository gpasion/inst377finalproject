const SupabaseClient = require("@supabase/supabase-js");
const bodyparser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
app.use(bodyparser.json());
app.use(express.static(__dirname + "/public"));

supabaseUrl = "https://mjentojpayegbwyjzgzh.supabase.co/";
supabaseAPIKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZW50b2pwYXllZ2J3eWp6Z3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMTU2OTQsImV4cCI6MjA0OTY5MTY5NH0.LAG5W472lWAR6TAyvJTUcGdsnvOwQ1FCBWOoCkmTrBQ";
const supabase = SupabaseClient.createClient(supabaseUrl, supabaseAPIKey);

app.get("/", (req, res) => {
  res.sendFile("public/workshop.html", { root: __dirname });
});

app.get("/agents", async (req, res) => {
  console.log("Getting all agents");

  const { data, error } = await supabase.from("agents").select();

  if (error) {
    console.log("Error: ", error);
    res.send(error);
  } else {
    console.log("Data Retrieved: ", data);
    res.send(data);
  }
});

app.post("/agent", async (req, res) => {
  console.log("Adding an agent");

  console.log("Request: ", req.body);
  const agentName = req.body.agentName;
  const agentRole = req.body.agentRole;
  const agentIcon = req.body.agentIcon;
  const agentDescription = req.body.agentDescription;
  const ability1name = req.body.ability1name;
  const ability1description = req.body.ability1description;
  const ability2name = req.body.ability2name;
  const ability2description = req.body.ability2description;
  const grenade = req.body.grenade;
  const grenadedescription = req.body.grenadedescription;
  const ultimate = req.body.ultimate;
  const ultimatedescription = req.body.ultimatedescription;

  const { data, error } = await supabase
    .from("agents")
    .insert({
      agent_name: agentName,
      agent_role: agentRole,
      agent_icon: agentIcon,
      agent_description: agentDescription,
      ability_1_name: ability1name,
      ability_1_description: ability1description,
      ability_2_name: ability2name,
      ability_2_description: ability2description,
      grenade_name: grenade,
      grenade_description: grenadedescription,
      ultimate_name: ultimate,
      ultimate_description: ultimatedescription,
    })
    .select();

  if (error) {
    console.log("Error: ", error);
    res.send(error);
  } else {
    console.log("Data Retrieved: ", data);
    res.send(data);
  }
});

app.listen(port, () => {
  console.log("Database Online");
});
