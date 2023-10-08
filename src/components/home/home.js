import { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { sendBackendPostRequest } from "../../utils/utils";

const Home = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);

  const onClearClick = () => {
    setQuestion("");
    setAnswer(null);
  };

  const onAnswerClick = () => {
    if (question !== "") {
      setAnswer("Loading your answer;)");
      let requestData = { query: question };
      sendBackendPostRequest("faq", requestData)
        .then((response) => {
          if (response !== null) {
            setAnswer(response.response);
          }
        })
        .catch((error) => {
          console.error("An unexpected error occurred:", error);
        });
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" padding={10}>
      <Grid item xs={8}>
        <TextField
          id="question"
          label="Question"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          sx={{ width: "100%" }}
        />
      </Grid>

      <Grid item xs={8}>
        <Card
          id="answer"
          variant="outlined"
          style={{ display: answer === null ? "none" : true }}
          padding={2}
          sx={{ width: "100%" }}
        >
          <CardContent>
            <Typography variant="body2">{answer}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={8} spacing={2} direction="row">
        <Button variant="contained" onClick={onAnswerClick} sx={{ m: 1 }}>
          Get answer
        </Button>

        <Button variant="contained" onClick={onClearClick} sx={{ m: 1 }}>
          Clear
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
