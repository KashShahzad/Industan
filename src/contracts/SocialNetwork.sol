pragma solidity >=0.4.21 <0.7.0;

contract SocialNetwork {
    string public name;

    uint public postCount = 0;

    //for storing on BC
    mapping(uint => Post)public posts;

    struct Post {
        uint id;
        string content;
        uint tipAmount;
        address author;
    }

    event PostCreated(
        uint id,
        string content,
        uint tipAmount,
        address author
    );

    constructor() public{
        name = "abc";
    }

    function createPost(string memory _content) public{
        //require valid content
        require(bytes(_content).length > 0, "Please fill content");
        //increment post count
        postCount ++;
        //create a post
        posts[postCount] = Post(postCount, _content, 0, msg.sender);
        //trigger event
        emit PostCreated(postCount, _content, 0, msg.sender);
    }
}
