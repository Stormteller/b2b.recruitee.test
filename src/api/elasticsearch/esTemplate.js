module.exports = (template) => ({
    "order": 0,
    "template": `${template}*`,
    "mappings": {
        "mytype": {
            "properties": {
                "@timestamp": {
                    "format": "epoch_millis",
                    "type": "date"
                },
                "start": {
                    "properties": {
                        "@timestamp": {
                            "format": "epoch_millis",
                            "type": "date"
                        }
                    }
                },
                "end": {
                    "properties": {
                        "@timestamp": {
                            "format": "epoch_millis",
                            "type": "date"
                        }
                    }
                },
                "vehicle": {
                    "properties": {
                        "numberplate_autocomplete": {
                            "type": "completion"
                        }
                    }
                },
                "summary": {
                    "properties": {
                        "drivingTimeMinutes": {
                            "type": "float"
                        },
                        "reservationTimeMinutes": {
                            "type": "float"
                        }
                    }
                }
            }
        },
        "_default_": {
            "properties": {
                "@timestamp": {
                    "format": "epoch_millis",
                    "type": "date"
                }
            }
        }
    },
    "aliases": {}
});