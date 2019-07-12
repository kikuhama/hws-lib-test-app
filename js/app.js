const HwsLibTestApp = {
    DATA_KEY: "test-app",
    
    App: function() {
    },
};

HwsLibTestApp.App.prototype.start = function() {
    this.load();
    const dataSaveHandler = this.save;
    const form = document.getElementById("dataform");
    const clearBtn = document.getElementById("clear_data");
    form.addEventListener("submit", dataSaveHandler);
    clearBtn.addEventListener("click", this.clearData);
};

HwsLibTestApp.App.prototype.clearData = function(e) {
    if(e) {
	e.preventDefault();
    }
    
    const nameEle = document.getElementById("name");
    const descriptionEle = document.getElementById("description");
    nameEle.value = "";
    descriptionEle.value = "";

    HWS.setUserData({
	content_id: HwsLibTestApp.CONTENT_ID,
	key: HwsLibTestApp.DATA_KEY,
	data: null,
	success: function() {
	    alert("Data cleared");
	},
	error: function(req, status, error) {
	    alert("Data clear error: ", error);
	}
    });
}

HwsLibTestApp.App.prototype.load = function() {
    const nameEle = document.getElementById("name");
    const descriptionEle = document.getElementById("description");
    
    HWS.getUserData({
	key: HwsLibTestApp.DATA_KEY,
	success: function(data) {
	    if(data) {
		nameEle.value = data.name;
		descriptionEle.value = data.description;
	    }
	},
	error: function(req, status, error) {
	}
    });
};

HwsLibTestApp.App.prototype.save = function(e) {
    if(e) {
	e.preventDefault();
    }
    
    const nameEle = document.getElementById("name");
    const descriptionEle = document.getElementById("description");
    const data = {
	name: nameEle.value,
	description: descriptionEle.value
    };
    HWS.setUserData({
	key: HwsLibTestApp.DATA_KEY,
	data: data,
	success: function() {
	    alert("Data saved");
	},
	error: function(req, status, error) {
	    alert("Data save error: ", error);
	}
    });
};

document.addEventListener("DOMContentLoaded", function() {
    const app = new HwsLibTestApp.App();
    app.start();
});
