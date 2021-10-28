package contract

import (
	"encoding/json"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
	contractapi.Contract
}

// the business object
type Vote struct {
	ID string `json:"id"`
	Creator string `json:"creator"`
	Status bool `json:"status"`
	For int `json:"for"`
	Against int `json:"against"`
}

// create a new voting record
func (s *SmartContract) CreatePoll(ctx contractapi.TransactionContextInterface, id string, creator string) error {
	vote := Vote{
		ID: id,
		Creator: creator,
		Status: true,
		For: 0,
		Against: 0,
	}
	//create readable object for the database
	voteJSON, err := json.Marshal(vote)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, voteJSON)
} 

// update a voting record, For
func (s *SmartContract) InFavour(ctx contractapi.TransactionContextInterface, id string) error {
	vote, err := s.GetPoll(ctx, id)
	vote.For += 1
	//create readable object for the database
	voteJSON, err := json.Marshal(vote)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, voteJSON)
} 

// update a voting record, Against
func (s *SmartContract) Against(ctx contractapi.TransactionContextInterface, id string) error {
	vote, err := s.GetPoll(ctx, id)
	vote.Against -= 1
	//create readable object for the database
	voteJSON, err := json.Marshal(vote)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, voteJSON)
} 

// get one vote record
func (s *SmartContract) GetPoll(ctx contractapi.TransactionContextInterface, id string) (*Vote, error) {
	voteJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return nil, err
	}

	var vote Vote
	json.Unmarshal(voteJSON, &vote)

	return &vote, nil
} 

// get all the vote records
func (s *SmartContract) GetAllPolls(ctx contractapi.TransactionContextInterface) ([]*Vote, error) {
	result, err := ctx.GetStub().GetStateByRange("","")
	if err != nil {
		return nil, err
	}

	defer result.Close()

	var votes []*Vote
	for result.HasNext()  {
		voteJSON, err := result.Next()
		if err != nil {
			return nil, err
		}

		var vote Vote
		json.Unmarshal(voteJSON.Value, &vote)
		votes = append(votes, &vote)
	}

	return votes, nil
} 

// set vote status
func (s *SmartContract) ClosePoll(ctx contractapi.TransactionContextInterface, id string) error {
	vote, err := s.GetPoll(ctx, id)
	if err != nil {
		return err
	}

	vote.Status = false
	
	voteJSON, err := json.Marshal(vote)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, voteJSON)
} 