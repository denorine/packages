module.exports = {
	/** 
	*@param {Discord.Client} client
	*/
	execute(client) {
    client.queue = new Map();
  }
}
