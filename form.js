$(function () {
  const rules = {
    bmeis_teach_gpu: { fixCpu: 8, fixMem: 48, info: "Resource requests are set automatically for this partition" }
  };

  const queue = $("#batch_connect_session_context_queue");
  const cores = $("#batch_connect_session_context_num_cores");
  const mem   = $("#batch_connect_session_context_memory");

  $("<div id='gpu-note' style='margin-top:6px;color:#666;display:none;'></div>")
    .insertAfter(queue);
  $("<div id='applied-rule-note' style='margin-top:6px;color:#666;display:none;'></div>")
    .insertAfter(mem);

  function syncPartitionRules() {
    const rule = rules[queue.val()];

    if (rule) {

        if (rule.fixCpu) {
          cores.val(rule.fixCpu).prop("readonly", true).addClass("ood-locked");
        } else {
          cores.prop("readonly", false).removeClass("ood-locked");
        }
        if (rule.fixMem) {
          mem.val(rule.fixMem).prop("readonly", true).addClass("ood-locked");
        } else {
          mem.prop("readonly", false).removeClass("ood-locked");
        }

      $("#applied-rule-note").text(rule.info).show();
    } else {
      cores.prop("readonly", false).removeClass("ood-locked");
      mem.prop("readonly", false).removeClass("ood-locked");
      $("#applied-rule-note").hide();
    }

    if (queue.val().includes("gpu")) {
      $("#gpu-note").text("You will be allocated 1 GPU.").show();
    }
    else {
      $("#gpu-note").hide();
    }
  }

  queue.on("change", syncPartitionRules);
  syncPartitionRules();
});